# starboardbot

Starboard bot, birkaç üyenin bir mesaja yıldız emojisi ile tepki vermesi sonucunda belirlediğiniz kanala o mesajı gönderen bir bottur. Bu sistem ile sunucunuz için güzel bir anı köşesi gibi bir şey yapabilirsiniz.

## kurulum

Öncelikle `.env_config` dosyasının adını `.env` olarak değiştirin ve ardından istenen bilgileri eşittir işaretlerinin karşısına yazın.

- `TOKEN`: Botunuzun tokeni
- `PREFIX`: Botunuzun prefixi
- `AUTHOR_ID`: Kendi idniz

Örnek: 
```
TOKEN=ABCDEFGHIJKLMNOPRSTUVYZ
PREFIX=!
AUTHOR_ID=123456789123456789
```

Ardından konsolu açın ve bunu konsola yazın:
```
node src/app.js
```

Ardından, konsolda görünen botunuzun davet bağlantısını kullanarak botu sunucunuza ekleyin ve bu komutu kullanın: (Başa belirlediğiniz prefixi yazmayı unutmayın)
```
kanal-ayarla <kanal> [gerekli yıldız sayısı]
```

Artık, sunucunuzdaki herhangi bir mesaj ayarladığınız yıldız sayısına eşit veya ondan daha fazla yıldız tepkisi alırsa, bu mesaj ayarladığınız kanala gönderilecektir. 🎉

## bazı soruların cevapları

#### "`[mesaja gitmek için tıklayın]`" metnini değiştirebilir miyiz?

Metni değiştirmek için, starboardbot/src/Base/Struct dosya yolunu takip edip MyClient.js dosyasının 22 satırındaki \`[mesaja gitmek için tıklayın]\` bölümünü güncelleyebilirsiniz. 

#### Yıldız emojisi yerine başka bir emoji ayarlayabilir miyim?

Yıldız emojisini değiştirmek için blabla dosya yolunu takip edip ve Kanal-Ayarla.js dosyasının 34. satırındaki yıldız emojisini değiştirebilirsiniz. Önemli: Emoji bir sunucu emojisi ise, emojiyi bu şekilde yazmalısınız: <:emojiadi:emojiidsi>

## teşekkürler

- [DazzGranto](https://github.com/DazzGranto)  
https://github.com/DazzGranto/basic-discord-bot

- [SimonLeclere](https://github.com/SimonLeclere)  
https://github.com/SimonLeclere/discord-starboards
