import { Link, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import Header from './header';
import Footer from './footer';
import Main from './main';
import Sidebar from './sidebar';
import MainFeaturedPost from './mainFeaturedPost';
import FeaturedPost from './featuredPost';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
/*import post1 from '../md/1.md';
import post2 from '../md/2.md';
import post3 from '../md/3.md';*/

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
  ];
  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random?wallpapers',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };
  const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random?wallpapers',
      imageLabel: 'Image Text',
    },
  ];
  const sidebar = {
    title: 'About',
    description:
      'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
      { title: 'March 2020', url: '#' },
      { title: 'February 2020', url: '#' },
      { title: 'January 2020', url: '#' },
      { title: 'November 1999', url: '#' },
      { title: 'October 1999', url: '#' },
      { title: 'September 1999', url: '#' },
      { title: 'August 1999', url: '#' },
      { title: 'July 1999', url: '#' },
      { title: 'June 1999', url: '#' },
      { title: 'May 1999', url: '#' },
      { title: 'April 1999', url: '#' },
    ],
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'X', icon: XIcon },
      { name: 'Facebook', icon: FacebookIcon },
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

const Layout = () => {
    return (
        <>
            {/*<CssBaseline />
                <Container maxWidth="lg">
    <Header title="MyEcoProject" sections={sections} />*/}
                    <main>
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
                                archives={sidebar.archives}
                                social={sidebar.social}
                            />     
                        </Grid>
                    </main>
                {/*</Container>
                <Footer
                    title="Footer"
                    description="Something here to give the footer a purpose!"
                          />*/}                            
        </>
    );
};

export {Layout};