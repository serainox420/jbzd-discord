const Discord = require('discord.js');
const client = new Discord.Client();
const { jbzdContent } = require('./jbzdScraper'); // Assuming your scraper code is in jbzdScraper.js

const TOKEN = 'YOUR_BOT_TOKEN';
const GUILD_ID = 'YOUR_GUILD_ID';
const CHANNEL_ID = 'YOUR_CHANNEL_ID';
const MAX_URLS = 10;

// Maintain a set to store sent photo URLs
const sentPhotoUrls = new Set();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  checkAndSendPhotos();
  setInterval(checkAndSendPhotos, 10 * 60 * 1000); // Check every 10 minutes
});

async function checkAndSendPhotos() {
  if (sentPhotoUrls.size > MAX_URLS) {
    resetSentPhotoUrls();
  }

  const latestPhotos = await jbzdContent('', 1); // Fetch latest photos without a specific category
  if (latestPhotos.length > 0) {
    const channel = client.guilds.cache.get(GUILD_ID)?.channels.cache.get(CHANNEL_ID);
    if (channel) {
      for (const photo of latestPhotos) {
        const imageUrl = photo.elements.find((element) => element.type === 'image')?.src;
        if (imageUrl && !sentPhotoUrls.has(imageUrl)) {
          channel.send(imageUrl);
          sentPhotoUrls.add(imageUrl); // Add the URL to the set of sent photos
        }
      }
    }
  }
}

function resetSentPhotoUrls() {
  sentPhotoUrls.clear(); // Clear the set of sent photo URLs
  console.log('Resetting sent photo URLs');
}

client.login(TOKEN);
