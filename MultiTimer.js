int[] DURATIONS = {
  115,      // T1: 1 min 55 s
  288,      // T2: 4 min 48 s
  14400,    // T3: 4 h
  28800     // T4: 8 h
};

final int NUM_TIMERS = DURATIONS.length;
final int NUM_SAMPLES = 9;

TimerQuadruple[] timers = new TimerQuadruple[NUM_SAMPLES];
Button[] startButtons = new Button[NUM_SAMPLES];

PFont fontBold;

// Layout
int marginX = 20;
int marginY = 40;
int colWidth = 100;
int rowHeight = 60;

void setup() {
  size(900, 600);
  fontBold = createFont("Courier-Bold", 20);
  textFont(fontBold);

  // Inizializzazione timer e pulsanti
  for (int i = 0; i < NUM_SAMPLES; i++) {
    timers[i] = new TimerQuadruple(
      DURATIONS[0]*1000,
      DURATIONS[1]*1000,
      DURATIONS[2]*1000,
      DURATIONS[3]*1000
    );
    // Posizione pulsante calcolata
    float bx = marginX + NUM_TIMERS * colWidth;
    float by = marginY + (i+1) * rowHeight - 30;
    startButtons[i] = new Button(bx, by, 60, 30, "Start");
  }
}

void draw() {
  background(255);

  // Intestazioni colonne
  textAlign(CENTER, CENTER);
  fill(0);
  for (int j = 0; j < NUM_TIMERS; j++) {
    float x = marginX + j * colWidth + colWidth/2;
    text("T" + (j+1), x, marginY/2);
  }
  text("START", marginX + NUM_TIMERS*colWidth + 30, marginY/2);

  // Righe con timer e pulsante
  for (int i = 0; i < NUM_SAMPLES; i++) {
    float y = marginY + (i+1) * rowHeight;

    // Disegna timer in colonna
    timers[i].update();
    timers[i].display(marginX, y, colWidth);

    // Pulsante
    startButtons[i].display();
  }
}

void mousePressed() {
  for (int i = 0; i < NUM_SAMPLES; i++) {
    if (startButtons[i].isClicked(mouseX, mouseY)) {
      timers[i].start();
    }
  }
}
