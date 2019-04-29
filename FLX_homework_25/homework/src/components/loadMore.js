class LoadMore {
  renderLoadMore(users) {
    const disabled = 'disabled';

    return `<div class="load-more">
              <p class="load-more__users-count-massage">
                Displayed ${users} users out of ${users}
              </p>
              
              <button type="text" class="load-more__button" ${users <= 0 ? disabled : null}>
                Load more
              </button>
            </div>`;
  }
}

export default LoadMore;
