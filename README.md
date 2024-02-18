<a name="readme-top"></a>

<br />
<div align="center">
    <h3 align="center">Realtime EVM Transaction Tracer(ERC721, ERC1155)</h3>
</div>

## About The Project

![Product Name Screen Shot][product-screenshot]

This repository is a complementary nodejs package to <a href='https://github.com/pranav3714/evm-nft-tx-tracker'>EVM TX Tracker</a>. This nodejs repo is a separate service that periodically scans the data generated by <a href='https://github.com/pranav3714/evm-nft-tx-tracker'>EVM TX Tracker</a> and complete the missing data in case of server restart or crash.

### Built With

[![NodeJS][nodejs.org]][Node-url] v20.11.0

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started
In order to setup the project on locally continue to the sections below.

### Prerequisites

- node v20.11.0
- yarn
- <a href="https://redis.io/download/">Redis Server</a>

### Installation

1. Get 2 rpc urls for any evm compatible chain you may want to setup tracking for.
2. Open the `.env.sample` file and add the values then rename it to `.env`.
3. Spin up a redis server on port 6379.
4. Install dependancy packages
   ```sh
   yarn
   ```
5. Spin up a local server by running
   ```sh
   yarn dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Node-url]: https://nodejs.org/en/download/
[nodejs.org]: https://img.shields.io/badge/nodejs-0769AD?style=for-the-badge&logo=javascript&logoColor=white
[EVM-tx-tracker]: https://github.com/pranav3714/evm-nft-tx-tracker