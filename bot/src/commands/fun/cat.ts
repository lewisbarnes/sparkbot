import axios from 'axios';
import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

type CatWeightInfo = {
  imperial: string;
  metric: string;
};

type CatBreedInfo = {
  weight: CatWeightInfo;
  id: string;
  name: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  life_span: string;
  wikipedia_url: string;
};

type CatImageResponse = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreedInfo[];
};

export default {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Request info about a random cat breed'),
  async execute(interaction: CommandInteraction, client: Client) {
    let request = axios.create({
      headers: {
        'X-API-KEY': process.env.CAT_API_KEY,
      },
    });
    const response = (await request.get('https://api.thecatapi.com/v1/images/search?has_breeds=1'))
      .data as Array<CatImageResponse>;

    const cat = response[0];

    const catEmbed = new EmbedBuilder()
      .setTitle(cat.breeds[0].name)
      .setAuthor({
        name: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL(),
      })
      .addFields(
        { name: 'Weight', value: `${cat.breeds[0].weight.metric}kg` },
        { name: 'Temperament', value: cat.breeds[0].temperament },
        { name: 'Origin', value: cat.breeds[0].origin },
        { name: 'Life Span', value: `${cat.breeds[0].life_span} years` }
      )
      .setImage(cat.url)
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    interaction.reply({
      embeds: [catEmbed],
      ephemeral: true,
    });
  },
};
