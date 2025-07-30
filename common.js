// Функция для открытия модального окна заказа
function openOrderModal(productName) {
  const modal = new bootstrap.Modal(document.getElementById('orderModal'))
  modal.show()
  
  // Автоматически выбираем товар в форме
  setTimeout(() => {
    const select = document.getElementById('product')
    if (select && productName) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.trim().toLowerCase() === productName.toLowerCase()) {
          select.selectedIndex = i
          break
        }
      }
    }
  }, 300)
}

// Функция для открытия модального окна записи на тариф
function openTariffModal(category, plan, price) {
  const modal = new bootstrap.Modal(document.getElementById('tariffModal'))
  modal.show()
  
  // Автоматически заполняем выбранный тариф
  setTimeout(() => {
    const categoryField = document.getElementById('tariffCategory')
    const planField = document.getElementById('tariffPlan')
    const priceField = document.getElementById('tariffPrice')
    
    if (categoryField) categoryField.value = category
    if (planField) planField.value = plan
    if (priceField) priceField.value = price
  }, 300)
}

document.addEventListener("DOMContentLoaded", () => {
  // Универсальная обработка всех форм
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault()
      // Определяем поля формы
      const getVal = (selector) => form.querySelector(selector)?.value?.trim() || ""
      let message = ""
      let modalTitle = "Спасибо!"
      let modalText = "Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время."
      let formType = ""
      // Специальная обработка для формы подписки в news.html
      if (window.location.pathname.includes('news.html') && form.querySelector('input[type="email"]') && form.querySelectorAll('input, textarea').length === 1) {
        const email = form.querySelector('input[type="email"]')?.value?.trim() || ""
        message = `Пользователь подписался на обновления.\nEmail: ${email}`
        modalTitle = "Спасибо за подписку!"
        modalText = "Вы успешно подписались на обновления."
        formType = "Подписка на новости"
      }
      // Магазин (заказ)
      else if (form.classList.contains("ujrf-order-form")) {
        formType = "Форма заказа"
        message =
          `<b>Новый заказ с сайта UJRF</b>\n` +
          `<b>Имя:</b> ${getVal('#name')}\n` +
          `<b>Телефон:</b> ${getVal('#phone')}\n` +
          (getVal('#email') ? `<b>Email:</b> ${getVal('#email')}\n` : "") +
          `<b>Товар:</b> ${form.querySelector('#product')?.options[form.querySelector('#product').selectedIndex]?.text || ""}\n` +
          `<b>Адрес:</b> ${getVal('#address')}\n` +
          (getVal('#comment') ? `<b>Комментарий:</b> ${getVal('#comment')}\n` : "")
        modalTitle = "Спасибо за заказ!"
        modalText = "Наш менеджер свяжется с вами в ближайшее время."
      }
      // Запись на тариф
      else if (form.classList.contains("ujrf-tariff-form")) {
        formType = "Запись на тариф"
        message =
          `<b>Новая заявка на запись с сайта UJRF</b>\n` +
          `<b>Имя:</b> ${getVal('#tariffName')}\n` +
          `<b>Телефон:</b> ${getVal('#tariffPhone')}\n` +
          (getVal('#tariffEmail') ? `<b>Email:</b> ${getVal('#tariffEmail')}\n` : "") +
          `<b>Категория:</b> ${getVal('#tariffCategory')}\n` +
          `<b>Тариф:</b> ${getVal('#tariffPlan')}\n` +
          `<b>Стоимость:</b> ${getVal('#tariffPrice')}\n` +
          (getVal('#tariffComment') ? `<b>Комментарий:</b> ${getVal('#tariffComment')}\n` : "")
        modalTitle = "Спасибо за заявку!"
        modalText = "Наш менеджер свяжется с вами в ближайшее время для подтверждения записи."
      }
      // Пробное занятие
      else if (form.classList.contains("ujrf-trial-form")) {
        formType = "Пробное занятие"
        message =
          `<b>Заявка на пробное занятие</b>\n` +
          `<b>Имя:</b> ${getVal('#name')}\n` +
          `<b>Телефон:</b> ${getVal('#phone')}\n` +
          (getVal('#email') ? `<b>Email:</b> ${getVal('#email')}\n` : "") +
          `<b>Возраст:</b> ${form.querySelector('#age')?.options[form.querySelector('#age').selectedIndex]?.text || ""}\n` +
          (getVal('#goals') ? `<b>Цели:</b> ${getVal('#goals')}\n` : "")
        modalTitle = "Спасибо за заявку!"
        modalText = "Мы свяжемся с вами для подтверждения времени занятия."
      }
      // Контакты (contacts.html)
      else if (form.classList.contains("ujrf-contact-form")) {
        formType = "Обратная связь"
        message =
          `<b>Новое обращение через сайт</b>\n` +
          `<b>Имя:</b> ${getVal('#name')}\n` +
          `<b>Телефон:</b> ${getVal('#phone')}\n` +
          `<b>Email:</b> ${getVal('#email')}\n` +
          `<b>Тема:</b> ${form.querySelector('#subject')?.options[form.querySelector('#subject').selectedIndex]?.text || ""}\n` +
          `<b>Сообщение:</b> ${getVal('#message')}`
        modalTitle = "Спасибо за обращение!"
        modalText = "Мы ответим вам в течение 24 часов."
      }
      // Документы (запрос документа)
      else if (form.classList.contains("ujrf-request-form")) {
        formType = "Запрос документа"
        message =
          `<b>Запрос документа</b>\n` +
          `<b>Имя:</b> ${getVal('#name')}\n` +
          `<b>Email:</b> ${getVal('#email')}\n` +
          `<b>Документ:</b> ${getVal('#document')}`
        modalTitle = "Спасибо за запрос!"
        modalText = "Мы свяжемся с вами и предоставим нужный документ."
      }
      // Главная, федерация, другие простые формы (без классов)
      else {
        formType = "Общая форма"
        // Собираем все input/textarea
        const fields = Array.from(form.querySelectorAll('input, textarea'))
        message = `<b>Новое сообщение с сайта</b>\n`
        fields.forEach(f => {
          if (f.type === 'submit' || !f.value) return
          let label = f.placeholder || f.labels?.[0]?.textContent || f.name || f.id || 'Поле'
          message += `<b>${label}:</b> ${f.value}\n`
        })
      }
      // Отправляем в Telegram через POST
      try {
        await fetch(
          "https://api.telegram.org/bot8075310982:AAF_RvOW-diXfJZqhxzhpFV6WFSh04Y6Hog/sendMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              chat_id: 777999076,
              text: message,
              parse_mode: "HTML"
            })
          }
        )
        // Показываем модальное окно Bootstrap (универсально)
        let modalEl = null
        if (formType === "Запись на тариф") {
          modalEl = document.getElementById('tariffSuccessModal')
          if (!modalEl) {
            // Если модального окна нет — создаём его динамически
            modalEl = document.createElement('div')
            modalEl.innerHTML = `<div class='modal fade' id='tariffSuccessModal' tabindex='-1' aria-labelledby='tariffSuccessModalLabel' aria-hidden='true'><div class='modal-dialog modal-dialog-centered'><div class='modal-content'><div class='modal-header border-0'><h5 class='modal-title w-100 text-center' id='tariffSuccessModalLabel'></h5><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Закрыть'></button></div><div class='modal-body text-center'><i class='bi bi-check-circle-fill text-success' style='font-size: 2.5rem;'></i><p class='mt-3 mb-0'></p></div></div></div></div>`
            document.body.appendChild(modalEl.firstChild)
            modalEl = document.getElementById('tariffSuccessModal')
          }
        } else {
          modalEl = document.getElementById('orderSuccessModal')
          if (!modalEl) {
            // Если модального окна нет — создаём его динамически
            modalEl = document.createElement('div')
            modalEl.innerHTML = `<div class='modal fade' id='orderSuccessModal' tabindex='-1' aria-labelledby='orderSuccessModalLabel' aria-hidden='true'><div class='modal-dialog modal-dialog-centered'><div class='modal-content'><div class='modal-header border-0'><h5 class='modal-title w-100 text-center' id='orderSuccessModalLabel'></h5><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Закрыть'></button></div><div class='modal-body text-center'><i class='bi bi-check-circle-fill text-success' style='font-size: 2.5rem;'></i><p class='mt-3 mb-0'></p></div></div></div></div>`
            document.body.appendChild(modalEl.firstChild)
            modalEl = document.getElementById('orderSuccessModal')
          }
        }
        
        modalEl.querySelector('.modal-title').textContent = modalTitle
        modalEl.querySelector('.modal-body p').textContent = modalText
        const modal = new bootstrap.Modal(modalEl)
        modal.show()
        
        // Закрываем модальные окна, если они открыты
        if (formType === "Запись на тариф") {
          const tariffModal = bootstrap.Modal.getInstance(document.getElementById('tariffModal'))
          if (tariffModal) {
            tariffModal.hide()
          }
        } else if (formType === "Форма заказа") {
          const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'))
          if (orderModal) {
            orderModal.hide()
          }
        }
        
      this.reset()
      } catch (err) {
        alert("Ошибка при отправке. Попробуйте ещё раз или свяжитесь с нами по телефону.")
      }
    })
  })

  // Обработка кнопок покупки в магазине
  const productCards = document.querySelectorAll(".ujrf-product-card, .card, .ujrf-bestseller-card")
  productCards.forEach((card) => {
    const buyButton = card.querySelector(".btn-ujrf-primary")
    if (buyButton && buyButton.textContent.includes("Купить")) {
      buyButton.addEventListener("click", function (e) {
        e.preventDefault()
        // Получаем название товара
        let productName = ""
        // Для карточек с h5
        const h5 = card.querySelector(".card-title")
        if (h5) {
          productName = h5.textContent.trim()
        } else {
          // Для бестселлеров с h3
          const h3 = card.querySelector("h3")
          if (h3) productName = h3.textContent.trim()
        }
        // Скроллим к форме заказа
        const orderFormSection = document.querySelector(".ujrf-order-form-wrapper")
        if (orderFormSection) {
          orderFormSection.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        // Выбираем нужный товар в select
        setTimeout(() => {
          const select = document.getElementById("product")
          if (select && productName) {
            for (let i = 0; i < select.options.length; i++) {
              if (
                select.options[i].text.trim().toLowerCase() === productName.toLowerCase()
              ) {
                select.selectedIndex = i
                break
              }
            }
          }
        }, 400)
        // Больше не меняем текст и цвет кнопки
      })
    }
  })

  // Smooth scrolling для якорных ссылок
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Анимация появления элементов при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Наблюдаем за карточками и секциями
  const animatedElements = document.querySelectorAll(".card, .ujrf-section")
  animatedElements.forEach((el) => observer.observe(el))
})

ymaps.ready(init);

function init() {
  const map = new ymaps.Map("map", {
    center: [41.330885, 69.304395], // Координаты Ташкента, можешь подставить свои
    zoom: 14
  });

  const placemark = new ymaps.Placemark([41.330885, 69.304395], {
    balloonContent: 'Мы тут!'
  });

  map.geoObjects.add(placemark);
}

