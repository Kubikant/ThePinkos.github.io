function loadPage(event, pageName) {
    event.preventDefault();
    fetch(pageName + ".html")
      .then(response => response.text())
      .then(html => {
        document.getElementById("content").innerHTML = html;
        history.pushState({ page: pageName }, "", pageName);
      })
      .catch(error => console.log("Error loading page: ", error));
  }
  
  window.onpopstate = function(event) {
    if (event.state && event.state.page) {
      loadPage(event, event.state.page);
    }
  };