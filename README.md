JS-obfu
=======

Obfuscate/make your JS code explode in size using only 6 characters.    
The characters that this obfuscator will use are **()[]+!**

**This is a work in progress.**    
Demo coming soon =)

```javascript
var script = "alert('hello!');";
var evil = evilize(script);

console.log(evil);
eval(evil);
```

**ToDo:** Evilizing of strings works, numbers don't.

---

**Note:** This obfuscator doesn't strive to use as least characters as possible.
It strived mostly to be the least programming work. This means it really is explosive.

**Q:** This isn't possible!    
**A:** Yet it is! We can generate a base character set using only these few characters,
by making them output the values (false,true,undefined,NaN,Infinity).
These are enough to create a full charset.

**Q:** Can I obfuscate whole documents with this?    
**A:** Theoretically you can, but practically you'll probably run out of RAM

**Q:** Can I use this as a javascript compressor?    
**A:** Obviously not.

**Q:** Then what's the use?    
**A:** Security through obscurity? Other than that, nothing that I can think of!
