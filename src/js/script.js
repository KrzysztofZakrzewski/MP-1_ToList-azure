const discriptionBtn = document.querySelector('.discription-btn');
const discriptionPopup = document.querySelector('.discription');
const BurgerBtn = document.querySelector('.burger');

function showDiscription() {
	discriptionPopup.classList.toggle('burger-active')
}

BurgerBtn.addEventListener('click', showDiscription)
discriptionBtn.addEventListener('click', showDiscription);
