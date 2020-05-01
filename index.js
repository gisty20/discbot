const Discord = require("discord.js");

const {token} =require('./config.json');
const prefix = "!";

var fortunes = [
    "yes",
    "no",
    "maybe",
    "never",
    "someday",
    "possibly",
    "in my basement",
    "tmr",
    "right now",
    "yore mum"

];

var channel;

var bot = new Discord.Client();

bot.on("ready", function(){
    console.log("Bot is ready");
});


bot.on("message", function(message) {
    console.log(message.content, message.author.username, message.author.id);
    console.log();

    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {

        case "8ball":
            if (args[1])
                message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else
                message.channel.sendMessage("English por favor");
            break;

        case "userinfo":
            var embed = new Discord.RichEmbed()

                .setColor(0x000ff)
                .setTitle("Information", message.author.avatarURL)
                .setAuthor((message.author.username), message.author.avatarURL)
                .setThumbnail(message.author.avatarURL)
                .addField("ID:", (message.author.id), true)
                .addField("Username:", (message.author.username), true)
                .addField("Created:", (message.author.createdAt), true)
                .setFooter("Productions")
                .setTimestamp()

            message.channel.sendEmbed(embed);
            break;

        case "avatar":
            if (args[1]) {

                const USER = message.mentions.users.first();
                const EMBED = new Discord.RichEmbed()
                    .setColor([255, 105, 180])
                    .setTitle(USER.username)
                    .setImage(USER.avatarURL)
                message.channel.sendEmbed(EMBED);
            }

            else
                message.channel.sendMessage("@ a user");

            break;

        case "help":
            var emb = new Discord.RichEmbed()
                .setColor(0x000ff)
                .setThumbnail("https://bit.ly/2IGLSHa")
                .setTitle("List of commands")
                .setURL("https://www.pornhub.com/")
                .addField("8ball:", ("Literally an 8ball command"), true)
                .addField("usernfo", ("Displays information of user who types it"))
                .addField("avatar", ("Displays an @user avatar"))
                .addField("Purge", ("Removes messages"), true)
                .addField("serverinfo", ("Displays info about server"))
                .addField("rnumber", ("Types a random number"), true)
                .setFooter("Productions")
                .setTimestamp();

            message.channel.send(emb);

            break;

        case "serverinfo":
            var serverinfo = new Discord.RichEmbed()
                .setTitle(message.guild.name)
                .setColor(0x000ff)
                .addField("Owners: ", (message.guild.owner))
                .setThumbnail(message.guild.iconURL)
                .addField("Region: ", (message.guild.region), true)
                .addField("Members: ", (message.guild.memberCount), true)
                .addField("Created at: ", (message.guild.createdAt))
                .setTimestamp()
                .setFooter("Productions");
            message.channel.sendEmbed(serverinfo);
            break;

        case "rnumber":

            message.channel.sendMessage([Math.floor(Math.random() * 100, 1)]);


            break;

        case "purge":

            if (args[1]) {


                if ((args[1])) {

                    message.channel.bulkDelete(2);
                    message.channel.bulkDelete(args[1]);
                }

                else

                    message.channel.sendMessage("put a number in")

            }

            else

                message.channel.sendMessage("put a number in")

            break;

        default:
            return 0;


        /*265266300496904192*/

       /* default:
            message.guild.members.get('265266300496904192').kick();
            message.channel.sendMessage("bye brandon")
            */

    }
});

bot.login(token);
