import React from "react";
import "./AboutUs.css";
import BlogSlider from "../Home/BlogSlider";
import Bg from "../Bg/Bg";

function AboutUs() {
  return (
    <div className="about-container">
      <Bg heading="About Us" />
      <div className="about-content">
        <p>Hi! I’m <span className="name">Shubham</span>, a passionate traveler, storyteller, and adventure seeker. What started as a simple hobby of exploring the world has turned into my life’s mission — to discover new cultures, meet incredible people, and share my experiences with fellow wanderers.</p>
        <p>Through this blog, I aim to inspire and guide travelers of all kinds, whether you’re just starting out or looking for your next great adventure. From hidden gems in popular destinations to off-the-beaten-path experiences, I believe there’s always something new to learn from every journey.</p>
        <p>Each destination I visit comes with its own story, and here, I share not just the highs but also the challenges of traveling solo. I’ve trekked through mountains, lounged on serene beaches, navigated bustling cities, and dined at hole-in-the-wall eateries that offer the most authentic flavors. This blog is where I document it all.</p>
        <h4>Why I Travel?   </h4>
        <p>For me, traveling isn’t just about checking off destinations on a map. It’s about the freedom to explore, immerse myself in unfamiliar environments, and appreciate the diverse beauty this world has to offer. I travel to gain new perspectives, to grow, and to live in the moment.</p>
        <h4>What You'll Find Here</h4>
        <ul>
            <li><span className="define">Travel Guides</span>: Detailed guides to help you plan your trips, whether you're heading to a bustling city or a tranquil retreat.</li>
            <li><span className="define">Travel Tips & Hacks</span>: From budget travel tips to packing guides and solo travel advice, I’ve got you covered.</li>
            <li><span className="define">Inspiration</span>: Beautiful photography, memorable stories, and insights from my personal travels to fuel your wanderlust.</li>
            <li><span className="define">Cultural Insights</span>: Get to know the people, traditions, and hidden stories of the places I visit.</li>
        </ul>
      </div>
      <div className="blog-container-about">
      {/* <h3>Explore More</h3> */}
      <BlogSlider />
      </div>
    </div>
  );
}

export default AboutUs;
