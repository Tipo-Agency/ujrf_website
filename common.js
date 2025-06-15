document.addEventListener("DOMContentLoaded", () => {
  // Обработка форм
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Форма отправлена! Мы свяжемся с вами в ближайшее время.")
      this.reset()
    })
  })

  // Обработка кнопок покупки в магазине
  const productCards = document.querySelectorAll(".ujrf-product-card, .card")
  productCards.forEach((card) => {
    const buyButton = card.querySelector(".btn-ujrf-primary")
    if (buyButton && buyButton.textContent.includes("Купить")) {
      buyButton.addEventListener("click", function (e) {
        e.preventDefault()
        const originalText = this.textContent
        this.textContent = "Добавлено!"
        this.classList.remove("btn-ujrf-primary")
        this.classList.add("btn-success")

        setTimeout(() => {
          this.textContent = originalText
          this.classList.remove("btn-success")
          this.classList.add("btn-ujrf-primary")
        }, 2000)
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
