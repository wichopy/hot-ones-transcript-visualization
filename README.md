Demo:

http://ramsayshotones.raptorsfries.ca/

To extract text from any youtube video:

Open youtube video.

Inspect network requests.

Enable closed captions.

Look for https://www.youtube.com/api/timedtext?expire=1548621961&v=U9DyHthJ6LA&asr_langs=ja%2Cfr%2Cen%2Cde%2Cko%2Cnl%2Cit%2Cpt%2Ces%2Cru&key=yttt1&hl=en&caps=asr&sparams=asr_langs%2Ccaps%2Cv%2Cexpire&signature=0AA3CCD79BEE6AE00008728A2392FD615D36F284.A9BBC6918719D0A34ACAE154DCAD76579587F7E6&kind=asr&lang=en&fmt=srv3

Copy response and save it

Parse the xml into a json, http://www.utilities-online.info/xmltojson/

Parse json in component.

