// === Parametri configurabili ===
int TIMER1_SECONDS = 115;  // 1 minuto e 55 secondi
int TIMER2_SECONDS = 288;  // 4 minuti e 48 secondi
int TIMER3_SECONDS = 14400;   // 4 ore
int TIMER4_SECONDS = 28800; // 8 ore

final int NUM_BUTTONS = 9;
Button[] buttons = new Button[NUM_BUTTONS];
TimerQuadruple[] timers = new TimerQuadruple[NUM_BUTTONS];
PFont fontBold;

void setup() {
  size(700, 600);
  fontBold = createFont("Courier-Bold", 26);
  textFont(fontBold);
  for (int i = 0; i < NUM_BUTTONS; i++) {
    buttons[i] = new Button(20, 30 + i * 50, 40, 30, str(i + 1));
        timers[i] = new TimerQuadruple(
            TIMER1_SECONDS * 1000,
            TIMER2_SECONDS * 1000,
            TIMER3_SECONDS * 1000,
            TIMER4_SECONDS * 1000,
        );
  }
}

void draw() {
  background(255);
    
// Intestazioni delle colonne
  textAlign(LEFT, BASELINE);
  fill(0);
  text("T1", 180, 20);
  text("T2", 260, 20);
  text("T3", 340, 20);
  text("T4", 420, 20);
  text("START", 500, 20);
    
  for (int i = 0; i < NUM_BUTTONS; i++) {
    buttons[i].display();
    timers[i].update();
    timers[i].display(180, 30 + i * 50);
  }
}

void mousePressed() {
  for (int i = 0; i < NUM_BUTTONS; i++) {
    if (buttons[i].isClicked(mouseX, mouseY)) {
      timers[i].start(); // Avvia i timer associati
    }
  }
}

// === CLASSI ===

class Timer {
  int duration;       // durata in millisecondi
  int startTime = 0;  // tempo di avvio

  boolean running = false;

  Timer(int d) {
    duration = d;
  }

  void start() {
    if (!running) {
      startTime = millis();
      running = true;
    }
  }
  void update() {
    if (running && millis() - startTime >= duration) {
      running = false;
    }
  }

  String getFormattedTime() {
    int remaining;

    if (!running && startTime == 0) {
      remaining = duration;
    } else if (!running) {
      return "00:00";
    } else {
      remaining = max(0, duration - (millis() - startTime));
    }

    int minutes = floor(remaining / 60000.0);
    int seconds = floor((remaining % 60000) / 1000.0);
    return nf(minutes, 2) + ":" + nf(seconds, 2);
  }

  String getFormattedTime_old() {
    if (!running && startTime == 0) {
      // Timer mai avviato → mostra durata iniziale
      int minutes = duration / 60000;
      int seconds = (duration % 60000) / 1000;
      return nf(minutes, 2) + ":" + nf(seconds, 2);
    } else if (!running) {
      // Timer terminato → mostra 00:00
      return "00:00";
    } else {
      int remaining = max(0, duration - (millis() - startTime));
      int minutes = remaining / 60000;
      int seconds = (remaining % 60000) / 1000;
      return nf(minutes, 2) + ":" + nf(seconds, 2);
    }
  }


  boolean isRunning() {
    return running;
  }
}

class TimerQuadruple {
  Timer t1, t2, t3, t4;
  String startTimestamp = "";
  String[] endTimestamps = {"", "", "", ""};
  boolean[] ended = {false, false, false, false};
  
  TimerQuadruple(int d1, int d2, int d3, int d4) {
    t1 = new Timer(d1);
    t2 = new Timer(d2);
    t3 = new Timer(d3);
    t4 = new Timer(d4);
  }

  void start() {
    t1.start();
    t2.start();
    t3.start();
    t4.start();
      ended[0] = ended[1] = ended[2] = ended[3] = false;
    endTimestamps[0] = endTimestamps[1] = endTimestamps[2] = endTimestamps[3] = "";
      startTimestamp = currentTime();
  }

  void update() {
    checkTimer(t1, 0);
    checkTimer(t2, 1);
    checkTimer(t3, 2);
    checkTimer(t4, 3);
  }
  
  void checkTimer(Timer t, int idx) {
    if (t.isRunning()) {
      t.update();
    } else if (!ended[idx] && t.startTime != 0) {
      endTimestamps[idx] = currentTime();
      ended[idx] = true;
    }
  }

 
    void display(float x, float y) {
    showTimer(t1, 0, x, y, color(0,150,0));
    showTimer(t2, 1, x+80, y, color(0,0,150));
    showTimer(t3, 2, x+160, y, color(150,0,0));
    showTimer(t4, 3, x+240, y, color(150,100,0));  // nuovo 8h

    if (startTimestamp != "") {
      fill(120);
      text(startTimestamp, x + 340, y + 20);
    }
  }

    void showTimer(Timer t, int idx, float x, float y, int col) {
    fill(t.isRunning() ? col : 0);
    text(t.getFormattedTime(), x, y + 20);
    if (endTimestamps[idx] != "") {
      fill(150);
      text("→ " + endTimestamps[idx], x, y + 40);
    }
    }

    String currentTime() {
    return nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2);
      }
}

class Button {
  float x, y, w, h;
  String label;

  Button(float x, float y, float w, float h, String label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
  }

  void display() {
    fill(200);
    rect(x, y, w, h);
    fill(0);
    textAlign(CENTER, CENTER);
    text(label, x + w/2, y + h/2);
  }

  boolean isClicked(float mx, float my) {
    return mx > x && mx < x + w && my > y && my < y + h;
  }
}
