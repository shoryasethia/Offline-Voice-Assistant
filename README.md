• Created an offline Speech-to-Speech voice assistant, seamlessly integrating a backend process involving quick 
Speech-to-Text and Text-to-Speech conversions.
• Implemented intelligent command interpretation; for instance, when users say like "Set light brightness to 80 
percent" or "Set fan speed to 4", the backend code intelligently extracts meaningful integer values.
• Orchestrated communication with an ESP-32 server, sharing the identified integer value over the same wi-fi.
• In real-time it adjusted corresponding lights or fans, by targeting slider variable and changing pwm values 
after a mathematical operation, finally assistant says an event concluding statement involving that integer value.

**To Clone this repo**
>git clone
