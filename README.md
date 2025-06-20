# ![Dealy Logo](https://your-logo-link.com/logo.png) **Dealy - Wishlist Sharing Platform**  
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen)](https://www.dealyshop.me)  
[![Watch on YouTube](https://img.shields.io/badge/YouTube-Project%20Demo-red)](https://www.youtube.com/watch?v=z_VgYqYEFmw)

---

## 🚀 **About Dealy**  

**Dealy** is an innovative wishlist-sharing platform designed to simplify e-commerce cart management and elevate the shopping experience for users, influencers, and small businesses alike.  
With Dealy, users can create, organize, and share wishlists while following influencers to discover curated product collections—all in one place.  

---

## 🌟 **Key Features**  

- **Personalized Online Dealy Shop**  
  Curate your favorite products and recommendations in a sleek, customizable storefront. Perfect for influencers and small businesses.  

- **Wishlist Sharing Made Easy**  
  Effortlessly share wishlists with friends, family, or anyone across the globe.  

- **Follow Influencers**  
  Discover curated product collections from influencers, saving you endless scrolling.  

- **Direct E-commerce Links**  
  Dealy provides direct product links, saving you time and making shopping a breeze.  

- **Trending Deals Section**  
  Find trending deals and discounts, all in one place.  

- **Real-Time Engagement**  
  Enjoy seamless interactions with live updates, notifications, and a vibrant user community.  

- **Creator Monetization**  
  Empower creators to collaborate with brands and monetize their content effectively.  

---

## 📊 **Impact So Far**  

- 🚀 **150+ Users** onboarded within the first week of launch.  
- 🛍️ **1,000+ Products** listed by the community.  
- 💬 Trusted by creators and small businesses for seamless engagement and shopping solutions.  

---

## 🛠️ **File structure*
dealy_deploy/
├── .gitignore
├── backend/
│   ├── .gitignore
│   ├── controllers/
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   ├── index.js
│   ├── middlewares/
│   │   ├── Email.js
│   │   ├── emailconfig.js
│   │   ├── EmailTemp.js
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── post.model.js
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── post.route.js
│   │   └── user.route.js
│   ├── socket/
│   │   └── socket.js
│   └── utils/
│       ├── cloudinary.js
│       ├── datauri.js
│       ├── db.js
│       ├── firebase.js
│       └── serviceaccountkey.json
├── frontend/
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   │   └── logofordealy.png
│   ├── README.md
│   ├── src/
│   │   ├── App.jsx
│   │   ├── assets/
│   │   │   ├── logo.png
│   │   │   └── logofordealy.png
│   │   ├── components/
│   │   │   ├── Comment.jsx
│   │   │   ├── CommentDialog.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Description.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── EmailVerify.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── ExploreSection.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── FeedForExplore.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Landing/
│   │   │   │   ├── assets/
│   │   │   │   │   ├── code.jpg
│   │   │   │   │   ├── logo.png
│   │   │   │   │   ├── logofordealy.png
│   │   │   │   │   ├── video1.mp4
│   │   │   │   │   └── video2.mp4
│   │   │   │   ├── components/
│   │   │   │   │   ├── FeatureSection.jsx
│   │   │   │   │   ├── Footer.jsx
│   │   │   │   │   ├── HeroSection.jsx
│   │   │   │   │   ├── Navbar.jsx
│   │   │   │   │   ├── Pricing.jsx
│   │   │   │   │   ├── Testimonials.jsx
│   │   │   │   │   └── Workflow.jsx
│   │   │   │   └── constants/
│   │   │   │       └── index.jsx
│   │   │   ├── LeftSideBar.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Post.jsx
│   │   │   ├── Posts.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ProtectedRoutes.jsx
│   │   │   ├── RightSidebar.jsx
│   │   │   ├── SearchUser.jsx
│   │   │   ├── SharePopUp.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── SinglePost.jsx
│   │   │   ├── SuggestedUsers.jsx
│   │   │   ├── TinderCard.jsx
│   │   │   └── ui/
│   │   │       ├── avatar.jsx
│   │   │       ├── badge.jsx
│   │   │       ├── button.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── popover.jsx
│   │   │       ├── select.jsx
│   │   │       ├── sonner.jsx
│   │   │       └── textarea.jsx
│   │   ├── firebase.js
│   │   ├── hooks/
│   │   │   ├── useGetAllPost.js
│   │   │   ├── useGetAllPostProducts.js
│   │   │   ├── useGetSuggestedUsers.js
│   │   │   └── useGetUserProfile.js
│   │   ├── index.css
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   └── Redux/
│   │       ├── authSlice.js
│   │       ├── chatSlice.js
│   │       ├── postSlice.js
│   │       ├── rtnSlice.js
│   │       ├── socketSlice.js
│   │       └── store.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package-lock.json
├── package.json
└── README.md


## 🛠️ **Tech Stack**  

- **Frontend**: React.js, Redux, Vite  
- **Backend**: Express.js, Node.js  
- **Database**: MongoDB Atlas  
- **Media Storage**: Cloudinary  
- **State Management**: Redux  
- **Hosting**:=Render  

---

## 🖼️ **Screenshots**  

### Homepage  
![Homepage Screenshot](https://res.cloudinary.com/dsxx9isde/image/upload/v1737269051/Screenshot_2025-01-19_121357_esai4x.png)  


---

## 🎥 **Project Demo**  

Watch the full project demo on [YouTube](https://youtu.be/z_VgYqYEFmw?si=A4E9pqYLD6UaVU_b).  

---

