'use strict'

document.addEventListener("DOMContentLoaded", () => {

/* ДИНАМИЧЕСКОЕ ПЕРЕЛИСТЫВАНИЕ КАРТОЧЕК ВЫГОДНЫХ ТОВАРОВ */

    const sliderLeft = document.querySelector('.sliderLeft');             // создаем переменную находя блок по классу
    const sliderRight = document.querySelector('.sliderRight');
    const product = document.querySelector('.profitably__list');

    /*
       *   Алгоритм
       *
       * 1. Начало
       * 2. Имеем 2 иконки: стрелка влево и стрелка вправо
       * 3. Нажимаем на кнопки и ожидаем перелистывание карточек товаров
       *  3.1. Нажимаем на кнопку вправо
       *   3.1.1 Происходит листание карточек справа налево поочередно одна за другой
       *  3.2. Нажимаем на кнопку влево 
       *   3.2.1. Происходит листание карточек слева направо поочередно одна за другой 
       * 4. Конец
       * 
       *   Блок-схема: /images/block_schema.png
       */
    if (sliderLeft) {                                                       // проверяем существование элемента в DOM
        console.log('Константа sliderLeft существует');
        sliderLeft.addEventListener('click', () => {
            console.log('Кнопка sliderLeft нажимается');
            let left = product.style.getPropertyValue('left');
            if (left) {
                left = left.replace('px', '');
                left = parseInt(left);
            }
            else {
                left = 0;
            }
            if (left>=0)
            {
                left = 0; 
            } else {
                left = left + 360;
            }
            console.log('left', left + 'px')
            product.style.setProperty('left', left + 'px');

        })
    }
    if (sliderRight) {                                                       // проверяем существование элемента в DOM
        console.log('Константа sliderRight существует');
        sliderRight.addEventListener('click', () => {
            console.log('Кнопка sliderRight нажимается');
            let width = 360*4;
            console.log('width' + width);
            /* let left = product.style.getPropertyValue('left);
            if (left) {
                left = left.replace('px', '');
            }
            else {
                left = 0;
            }
            left = parseInt(left) - 350;
            console.log('left' + left);
            product.style.setProperty ('left', left + 'px');*/
            let left = product.style.getPropertyValue('left');
            if (left) {
                left = left.replace('px', '');
                left = parseInt(left);
            }
            else {
                left = 0;
            }
            if (left >= width - 360)
            {
                left = width - 360;
            } else {
                left = left - 360;
            }
            console.log('left' + left);
            product.style.setProperty('left', left + 'px');

        })
    }
    console.log('Скрипт отработал корректно')
    });

/* НАЗВАНИЯ ТОВАРОВ */

    const profitably__list = document.querySelector(".product"); 
    if (profitably__list) {
        const dataProduct__title = [
            "Водолазка",
            "Рубашка",
            "Сапоги",
            "Свитшот",
            "Кофта",
            "Джинсы",
            "Пиджак",
            "Костюм",
            "Комплект",
        ];
        const product__title =
        profitably__list.querySelectorAll(".product__title");

        product__title.forEach((item, index) => {

            item.textContent = dataProduct__title[index];
           });
    }

/* ФОРМЫ */

/* ФОРМА ВХОДА */

    const HeaderButton = document.querySelector('.header__button-login');
    const FormWindow = document.querySelector('.form-enter');
console.log(HeaderButton);
console.log(FormWindow);
    if (HeaderButton && FormWindow) {
        HeaderButton.addEventListener("click", () => {
            FormWindow.removeAttribute("hidden");
        });
    }

    // Закрытие модального окна при клике вне его области
    window.addEventListener("click", (event) => {
        if (event.target === FormWindow) {
            FormWindow.setAttribute("hidden", true);
        }
    });

    // Закрытие модального окна при клике на кнопку закрытия
    const closeEnter = document.querySelector (".form__close-enter");
     
    closeEnter.addEventListener("click", () => {
        FormWindow.setAttribute("hidden", true);
    });


/* ФОРМА РЕГИСТРАЦИИ */

    const registrationButton = document.querySelector('.form__link');
    const registrationForm = document.querySelector('.form-registration');
console.log(registrationButton);
console.log(FormWindow);
    if (registrationButton && registrationForm) {
        registrationButton.addEventListener("click", () => {
            registrationForm.removeAttribute("hidden");
        });
    }

    // Закрытие модального окна при клике вне его области
    window.addEventListener("click", (event) => {
        if (event.target === registrationForm) {
            registrationForm.setAttribute("hidden", true);
        }
    });

    // Закрытие модального окна при клике на кнопку закрытия
    const closeRegistration = document.querySelector (".form__close-registration");
     
    closeRegistration.addEventListener("click", () => {
        registrationForm.setAttribute("hidden", true);
    });


/* НАВИГАЦИОННОЕ МЕНЮ */

    const headerMenu = document.querySelector('.header__menu');
    if (headerMenu){
        const headerList = headerMenu.querySelector('.header__list');
        const menuData = {
            link1: {
                link: '#',
                title: 'Одежда',
            },
            link2: {
                link: '#',
                title: 'Обувь',
            },
            link3: {
                link: '#',
                title: 'Аксессуары',
            }
        }
        const createLink = (UrlLink, title) =>{
            const link = `
            <li class="header__item"><a href="${UrlLink}" class="header__item-link">${title}</a></li>
            `;
            return link;
        }
        for (const linkItem in menuData) {
            const link = menuData[linkItem];
            const linkIndex = createLink(link.UrlLink, link.title);
            headerList.insertAdjacentHTML('beforeend', linkIndex);

        }
    console.log('Навигацинное меню создано с помощью javascript!');
    }
    

    /* ЗАДАНИЕ 6 */

    const menuContainer = document.querySelector('#menu');
    if (menuContainer) {
        const menuList = menuContainer.querySelector('.header__list');
        const apiUrl = 'data.json';
        const createItem = (linkUrl, title) => {
            
            const item = `
                     <li class="header__item"><a class="header__item-link" href="${linkUrl}">${title}</a></li>
            `;
            return item;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(typeof (data));

                data.forEach(item => {
                    const headerItem = createItem(item.link, item.title);
                    menuList.insertAdjacentHTML('beforeend', headerItem);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
    }


    /* ПРЕДЗАГРУЗЧИК */
    const preloader = document.querySelector(".preloader");
    const content = document.querySelector(".content");
    if (preloader && content) {
        setTimeout(() => {

            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";

            content.style.display = "block";

            preloader.remove();
        }, 3000);
    }

    