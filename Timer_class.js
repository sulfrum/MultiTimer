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

