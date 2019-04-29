class Search {
  renderSearch() {
    const header = document.createElement('header');
    header.setAttribute('class', 'header');

    header.innerHTML = `<form class='search'>
                          <label class='search__label' for='search'>
                            Search by name:
                          </label>
                            
                          <input type='text' id='search' class='search__input' placeholder='Enter user name...'/>
                        </form>`;

    document.querySelector('body').appendChild(header);
  }
}

export default Search;
