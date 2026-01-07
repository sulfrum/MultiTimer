class TimerQuadruple {
  Timer[] t;
  String startTimestamp = "";
  String[] endTimestamps;
  boolean[] ended;
  
  TimerQuadruple(int d1, int d2, int d3, int d4) {
    t = new Timer[4];
    t[0] = new Timer(d1);
    t[1] = new Timer(d2);
    t[2] = new Timer(d3);
    t[3] = new Timer(d4);
    
    endTimestamps = new String[4];
    ended = new boolean[4];
  }

  void start() {
    for (int i = 0; i < 4; i++) {
      t[i].start();
      ended[i] = false;
      endTimestamps[i] = "";
    }
    startTimestamp = currentTime();
  }

  void update() {
    for (int i = 0; i < 4; i++) {
      if (t[i].isRunning()) {
        t[i].update();
      } else if (!ended[i] && t[i].startTime != 0) {
        endTimestamps[i] = currentTime();
        ended[i] = true;
      }
    }
  }
	
	void reset() {
	  for (int i = 0; i < 4; i++) {
	    t[i].reset();
	    ended[i] = false;
	    endTimestamps[i] = "";
	  }
	  startTimestamp = "";
	}

  void display(float x0, float y, float colW) {
	  
	  // START timestamp (a sinistra di T1)
	  if (startTimestamp != "") {
	    fill(120);
	    textAlign(RIGHT, CENTER);
	    textSize(12);
	    text(startTimestamp, x0 - 10, y);
	    textSize(20);
	  }
	  
    for (int i = 0; i < 4; i++) {
      float x = x0 + i * colW;
      fill(t[i].isRunning() ? color(0, 120, 200) : 0);
      textAlign(CENTER, CENTER);
      text(t[i].getFormattedTime(), x + colW/2, y);

      if (endTimestamps[i] != "") {
        fill(150);
        textSize(12);
        text(endTimestamps[i], x + colW/2, y + 20);
        textSize(20);
      }
    }
  }

	String currentTime() {
    return nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2);
  }


	boolean isAnyRunning() {
	  for (int i = 0; i < 4; i++) {
	    if (t[i].isRunning()) return true;
	  }
	  return false;
	}


}
