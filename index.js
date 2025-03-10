const fetch = require("node-fetch");
const { token, data, data2, data3 } = require("./config.js");
const chalk = require("chalk");

async function boostAdvertisements(advertisementData, label) {
    for (const ID of advertisementData) {
        try {
            let newData = await fetch("https://www.itemsatis.com/api/merchant/v1/moveUpMyPost", {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ postID: ID, token }),
                method: "POST"
            }).then(res => res.json());

            if (newData.success) {
                console.log(chalk.rgb(230, 184, 0)(`{<>}`) + chalk.gray(`${ID} ||| ${newData.message.replace(/<\/?b>/g, " ").replace(/<br>/g, " ")}`));
            } else if (newData.success === false) {
				console.log(`${newData.message}`)
                console.log(chalk.rgb(230, 184, 0)(`{<>}`) + chalk.gray(`${ID} ||| ${newData.message.replace(/<\/?b>/g, " ").replace(/<br>/g, " ").replace(" Farklı kategoride bulunan ilanlarınızı yukarı taşımayı deneyiniz.", " ")}`));
                console.log(chalk.rgb(230, 184, 0)(`{<>}`) + chalk.gray(`${ID} ||| Süre dolmamış, 10 saniye sonra tekrar denenecektir.`));
                await new Promise(resolve => setTimeout(resolve, 10 * 1000));
                console.log(chalk.rgb(230, 184, 0)(`{<>}`) + chalk.gray(`${ID} ||| Tekrar denendi.`));
                boostAdvertisements([ID], label);
            }
        } catch (error) {
            console.error(chalk.red(`Hata oluştu: ${error.message}`));
            // Hata durumunda devam etmek için gerekli adımları burada ekleyebilirsiniz.
        }
    }
    console.log(chalk.rgb(230, 184, 0)(`{<>} `) + chalk.gray(`||| İlanlar yukarı taşındı ${label}`));
}

console.log(chalk.rgb(230, 184, 0)(`{<>} `) + chalk.gray(`||| Script Aktif - WCK`));

// işleyişi bilmiyorsanız fonksiyonu ellemeden önce bir yere yedeğini alın
function runAtSpecificTime(hour, minute, second, callback) {
    const now = new Date();
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second, 0);

    let timeUntilScheduled = scheduledTime - now;
    if (timeUntilScheduled < 0) {
        timeUntilScheduled += 24 * 60 * 60 * 1000; // Bir sonraki gün için ayarla
    }

    setTimeout(() => {
        callback();
        setInterval(callback, 24 * 60 * 60 * 1000); // Her gün aynı saatte tekrar etmesi için
    }, timeUntilScheduled);
}

// Belirtilen saatlerde çalıştır, en baştaki datayı scripti çalıştırdığınız zamana göre ayarlarsanız boşuna 3 saaat beklemezsiniz
// pcden saat çekmedim, yurt dışından bağlananlar sorun yaşıyor sonra isteyen yapabilir
const scheduledTimes = [
    { hour: 20, minute: 54, second: 45 },
    { hour: 0, minute: 0, second: 0 },
    { hour: 3, minute: 0, second: 0 },
    { hour: 6, minute: 0, second: 0 },
    { hour: 9, minute: 0, second: 0 },
    { hour: 12, minute: 0, second: 0 },
    { hour: 15, minute: 0, second: 0 },
    { hour: 18, minute: 0, second: 0 },
    { hour: 21, minute: 0, second: 0 }
];

const scheduledTimes2 = [
    { hour: 1, minute: 0, second: 0 },
    { hour: 4, minute: 0, second: 0 },
    { hour: 7, minute: 0, second: 0 },
    { hour: 10, minute: 0, second: 0 },
    { hour: 13, minute: 0, second: 0 },
    { hour: 16, minute: 0, second: 0 },
    { hour: 19, minute: 0, second: 0 },
    { hour: 22, minute: 0, second: 0 }
];

const scheduledTimes3 = [
    { hour: 2, minute: 0, second: 0 },
    { hour: 5, minute: 0, second: 0 },
    { hour: 8, minute: 0, second: 0 },
    { hour: 11, minute: 0, second: 0 },
    { hour: 14, minute: 0, second: 0 },
    { hour: 17, minute: 0, second: 0 },
    { hour: 20, minute: 0, second: 0 },
    { hour: 23, minute: 0, second: 0 }
];

scheduledTimes.forEach(time => {
    runAtSpecificTime(time.hour, time.minute, time.second, () => {
        console.log(chalk.rgb(230, 184, 0)(`{<>} `) + chalk.gray(`||| Saat ${time.hour} , ${time.minute} , ${time.second}`));
        boostAdvertisements(data, 1);
    });
});

boostAdvertisements(data, 1);

scheduledTimes2.forEach(time => {
    runAtSpecificTime(time.hour, time.minute, time.second, () => {
        console.log(chalk.rgb(230, 184, 0)(`{<>} `) + chalk.gray(`||| Saat ${time.hour} , ${time.minute} , ${time.second}`));
        boostAdvertisements(data2, 2);
    });
});

scheduledTimes3.forEach(time => {
    runAtSpecificTime(time.hour, time.minute, time.second, () => {
        console.log(chalk.rgb(230, 184, 0)(`{<>} `) + chalk.gray(`||| Saat ${time.hour} , ${time.minute} , ${time.second}`));
        boostAdvertisements(data3, 3);
    });
});

process.on('unhandledRejection', err => {
    console.log(err);
});