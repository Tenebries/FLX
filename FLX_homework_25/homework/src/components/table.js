import User from './user';
import LoadMore from './loadMore';

class Table {
  constructor(state, loadTo) {
    this.state = state;
    this.root = loadTo;
    this.users = this.state.data.slice(0, this.state.limit);
    this.user = new User();
    this.loadMore = new LoadMore();
    this.notFound = `<tr class='table__not-found-massage'>
                       <td colspan="7">
                         <span>
                           No user has been found!
                         </span>
                       </td>
                     </tr>`;
    this.head = () => {
      return `<thead class="table__head">
                <tr class="table__row-primary">
                  <th class="table__title">Photo</th>
                  <th class="table__title">Name</th>
                  <th class="table__title">Address</th>
                  <th class="table__title">Email</th>
                  <th class="table__title">Phone Number</th>
                  <th class="table__title">Timezone</th>
                  <th class="table__title">Actions</th>
                </tr>
              </thead>`;
    };
  }

  renderTable() {
    this.root.innerHTML = `<table class='table'>  
                             ${this.head()}
                             <tbody class='table__body'>
                               ${this.state.limit > 0 ? this.user.renderUser(this.users) : this.notFound}
                             </tbody>
                           </table>
                           ${this.loadMore.renderLoadMore(this.state.limit)}`;
  }

  filterUsers() {
    const table = document.querySelector('.table__body');
    const search = document.querySelector('.search__input');
    const filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(search.value.toLowerCase())
    );
    document.querySelector('.load-more__users-count-massage').innerHTML =
      `Displayed ${filteredUsers.length} users out of ${this.users.length}`;

    if (filteredUsers.length <= 0) {
      table.innerHTML = this.notFound;
    } else {
      let output = '';
      for (let user of filteredUsers) {
        output += this.user.renderUser([user]);
      }
      table.innerHTML = output;
    }
  }
}

export default Table;
