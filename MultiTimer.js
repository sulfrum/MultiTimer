// === Parametri configurabili ===
int TIMER1_SECONDS = 115;  // 1 minuto e 55 secondi
int TIMER2_SECONDS = 288;  // 4 minuti e 48 secondi
int TIMER3_SECONDS = 14400;   // 4 ore

final int NUM_BUTTONS = 9;
Button[] buttons = new Button[NUM_BUTTONS];
TimerTriple[] timers = new TimerTriple[NUM_BUTTONS];
PFont fontBold;

void setup() {
  size(500, 600);
  fontBold = createFont("Courier-Bold", 16);
  textFont(fontBold);
  for (int i = 0; i < NUM_BUTTONS; i++) {
    buttons[i] = new Button(20, 30 + i * 50, 40, 30, str(i + 1));
		timers[i] = new TimerTriple(TIMER1_SECONDS * 1000, TIMER2_SECONDS * 1000, TIMER3_SECONDS * 1000);

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
  text("START", 420, 20);
	
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

class TimerTriple {
  Timer t1, t2, t3;
  String startTimestamp = "";
  String endTimestamp1 = "";
  String endTimestamp2 = "";
  String endTimestamp3 = "";

  boolean t1Ended = false;
  boolean t2Ended = false;
  boolean t3Ended = false;

  TimerTriple(int d1, int d2, int d3) {
    t1 = new Timer(d1);
    t2 = new Timer(d2);
    t3 = new Timer(d3);
  }

  void start() {
    t1.start();
    t2.start();
    t3.start();
    t1Ended = t2Ended = t3Ended = false;
    endTimestamp1 = endTimestamp2 = endTimestamp3 = "";
    int h = hour();
    int m = minute();
    int s = second();
    startTimestamp = nf(h, 2) + ":" + nf(m, 2) + ":" + nf(s, 2);
  }

  void update() {
    if (t1.isRunning()) {
      t1.update();
    } else if (!t1Ended && t1.startTime != 0) {
      endTimestamp1 = currentTime();
      t1Ended = true;
    }

    if (t2.isRunning()) {
      t2.update();
    } else if (!t2Ended && t2.startTime != 0) {
      endTimestamp2 = currentTime();
      t2Ended = true;
    }

    if (t3.isRunning()) {
      t3.update();
    } else if (!t3Ended && t3.startTime != 0) {
      endTimestamp3 = currentTime();
      t3Ended = true;
    }
  }

  void display(float x, float y) {
    fill(t1.isRunning() ? color(0, 150, 0) : 0);
    text(t1.getFormattedTime(), x, y + 20);
    if (endTimestamp1 != "") {
      fill(150);
      text("→ " + endTimestamp1, x, y + 40);
    }

    fill(t2.isRunning() ? color(0, 0, 150) : 0);
    text(t2.getFormattedTime(), x + 80, y + 20);
    if (endTimestamp2 != "") {
      fill(150);
      text("→ " + endTimestamp2, x + 80, y + 40);
    }

    fill(t3.isRunning() ? color(150, 0, 0) : 0);
    text(t3.getFormattedTime(), x + 160, y + 20);
    if (endTimestamp3 != "") {
      fill(150);
      text("→ " + endTimestamp3, x + 160, y + 40);
    }

    if (startTimestamp != "") {
      fill(120);
      text(startTimestamp, x + 260, y + 20);
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
