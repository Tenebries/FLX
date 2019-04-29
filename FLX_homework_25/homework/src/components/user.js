class User {
    renderUser(currentUser) {
        let output = '';

        for (let user of currentUser) {
            const {name, location, email, phone, picture, timezone, id} = user;
            output += `<tr class="table__row">
                        <td class="table__cell">
                          <img src="${picture}" alt="User photo" />
                        </td>
                        <td class="table__cell">${name}</td>
                        <td class="table__cell">${location}</td>
                        <td class="table__cell">${email}</td>
                        <td class="table__cell">${phone}</td>
                        <td class="table__cell">${timezone}</td>
                        <td class="table__cell">
                          <button data-id="${id}" class="table__cell--remove" type="button">
                            Remove
                          </button>
                        </td>
                      </tr>`;
        }

        return output;
    }
}

export default User;
