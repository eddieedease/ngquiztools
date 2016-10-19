Just dropping this here, maybe someone finds it useful

# Quiz tools

Just some simple tools to show on beamersoutput for a quiz.
Currently has:
  - A countdown timer   (With music, sounds)
  - Score announcements (Music, sounds & Confetti)

This application is made with Angular (hence the ng). No npm or that kind of stuff here, just basic.
Bower components are included

Just run /watch.html. Everything is bundled into that.

## Using

Hotkeys:
When opening watch.html

###Timer
  - P:   hide/show timers
  - Z/- X/- C: If timer is shown, change seconds for question to 10,30,60 sec.
  - SPACE: Start countdown

###Score
  - when timers is hidden press space

###Endscore  
When the timer is hidden, you can press space. It stops after just before last 3, hit space again after drumm roll to reveal last 3
  - R and then - SPACE: show confetti, sets up endresult.


For scoring: responds to the input from /json/score.json, automagically in the right order etc.
