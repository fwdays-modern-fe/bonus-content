import { faker } from '@faker-js/faker';

const mount = (el) => {
    let list = '<ul style="list-style-type: none; padding: 0;">';

    for (let i = 0; i < 30; i++) {
        const name = faker.commerce.productName();
        list += `
        <li style="
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            margin-bottom: 10px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        ">
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <span>${name}</span>
                <span style="color: #757575; font-size: 0.9em;">${faker.commerce.price()}</span>
            </div>
        </li>`;
    }

    list += '</ul>';

    el.innerHTML = list;
};

if (process.env.NODE_ENV === "development") {
    const el = document.querySelector("#dev-list");

    if (el) {
        mount(el);
    }
}

export { mount };
