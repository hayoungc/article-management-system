# article-management-system

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- TABLE OF CONTENTS -->
<!-- <details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#npmstart">npm start</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details> -->

<!-- ABOUT THE PROJECT -->

## About The Project

<div>
Develop a dashboard to manage articles with these features:
    
- User: Register, Login, Logout
- Article: table list, new, tags, edit, delete
- PrivateRoute for authenticated user
- Responsive design, nice CSS and loading spinner
- Unit testing using Jest & Testing-Library
</div>

There is no real API. All mock API is implemented on mockBackend.js.
Anyone can replace it with a real API without touching other parts of this project.
To save user/artice state in the client side, LocalStorage is utilized.

<!-- BUILT WITH -->

## Built With

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
- ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

<!-- UNIT TESTING -->

## Unit Testing

- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- ![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
- ![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)

<!-- NPMSTART -->

## npm start

Runs the app in the development mode.\
Open [http://localhost:5400](http://localhost:5400) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

<!-- ROADMAP -->

## Roadmap

- [ ] Tag based article search
- [ ] User info modify
- [ ] i18n: react-i18next
- [ ] Refactoring CSS

See the [open issues](https://github.com/hayoungc/article-management-system/issues) for a full list of proposed features (and known issues).

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Hayoung Choi - hayoungcau@gmail.com

Project Link: [https://github.com/hayoungc/article-management-system](https://github.com/hayoungc/article-management-system)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/hayoungc/article-management-system.svg?style=for-the-badge
[contributors-url]: https://github.com/hayoungc/article-management-system/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/hayoungc/article-management-system.svg?style=for-the-badge
[forks-url]: https://github.com/hayoungc/article-management-system/network/members
[stars-shield]: https://img.shields.io/github/stars/hayoungc/article-management-system.svg?style=for-the-badge
[stars-url]: https://github.com/hayoungc/article-management-system/stargazers
[issues-shield]: https://img.shields.io/github/issues/hayoungc/article-management-system.svg?style=for-the-badge
[issues-url]: https://github.com/hayoungc/article-management-system/issues
[license-shield]: https://img.shields.io/github/license/hayoungc/article-management-system.svg?style=for-the-badge
[license-url]: https://github.com/hayoungc/article-management-system/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/hayoung-choi
