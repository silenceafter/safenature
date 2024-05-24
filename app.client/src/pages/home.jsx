import React from 'react';
import Main from '../components/main';
import Sidebar from '../components/sidebar';
import MainFeaturedPost from '../components/mainFeaturedPost';
import FeaturedPost from '../components/featuredPost';
import Grid from '@mui/material/Grid';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import { WhatsApp } from '@mui/icons-material';
/*import post1 from '../md/1.md';
import post2 from '../md/2.md';
import post3 from '../md/3.md';*/

const mainFeaturedPost = {
  title: 'Эко-проект по утилизации опасных отходов',
  description:
    "Эффективная координация деятельности по утилизации отходов первого и второго классов опасности",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: '',
};
const featuredPosts = [
  {
    title: 'Новый пункт приема отходов',
    date: '22.05.24',
    description:
      'Новый пункт приема отходов открылся в городе Белгород.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Товаров бренда стало больше',
    date: '06.05.24',
    description:
      'С сегодняшнего дня дополнительно к текущему ассортименту с логотипом бренда добивились стильные худи.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];
const sidebar = {
  title: 'О нас',
  description:
    'Наш проект по обработке опасных отходов первого и второго классов опасности - это инициатива, посвящённая охране окружающей среды, созданию устойчивой экосистемы и обеспечению безопасности нашего будущего! Присоединяйтесь к нам в нашем стремлении сделать мир зеленым, чистым и безопасным для всех живых существ!',
  social: [
    { name: 'Telegram', icon: TelegramIcon },
    { name: 'WhatsApp', icon: WhatsAppIcon },    
    { name: 'Youtube', icon: YoutubeIcon }
  ],
};

const post1 = `
# Sample blog post

_April 1, 2020 by [Olivier](/)_

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

## Heading

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

### Sub-heading 1

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

### Sub-heading 2

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
sit amet risus.

- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.

1. Vestibulum id ligula porta felis euismod semper.
1. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
1. Maecenas sed diam eget risus varius blandit sit amet non magna.

Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.
`;

const post2 = `
# Another blog post

_March 23, 2020 by [Matt](/)_

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.

Curabitur blandit tempus porttitor. **Nullam quis risus eget urna mollis** ornare vel eu leo.
Nullam id dolor id nibh ultricies vehicula ut id elit.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
`;

const post3 = `
# New feature

_March 14, 2020 by [Tom](/)_

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.
Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
ut fermentum massa justo sit amet risus.

- Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
- Donec id elit non mi porta gravida at eget metus.
- Nulla vitae elit libero, a pharetra augue.

Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.
Aenean lacinia bibendum nulla sed consectetur.

Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
`;
const posts = [post1, post2, post3];

const Home = () => {
    return (
        <>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}> 
              {featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
              ))}           
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
              <Main title="From the firehose" posts={posts} />
              <Sidebar
                  title={sidebar.title}
                  description={sidebar.description}
                  social={sidebar.social}
              />     
          </Grid>                                     
        </>
    );
};

export {Home};