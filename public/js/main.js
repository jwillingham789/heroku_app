//Link to Details Page
document.body.addEventListener('click', function(e){
  if (e.target.classList.contains('thumbnail')) {
    window.location.href = '/detail.html?id=' + e.target.getAttribute('data-id')
  }
  else if (e.target.parentNode.classList.contains('thumbnail')) {
    window.location.href = '/detail.html?id=' + e.target.parentNode.getAttribute('data-id')
  }
  else if (e.target.parentNode.parentNode.classList.contains('thumbnail')) {
    window.location.href = '/detail.html?id=' + e.target.parentNode.parentNode.getAttribute('data-id')
  }
})

//Parses and Sorts the Page Data
fetch('https://sleepy-beach-29542.herokuapp.com/api/v1/portfolio')
  .then(function(jsonData){
    return jsonData.json()
  })
  .then(function(data) {

    var feature = document.querySelector('#featured')
    var other = document.querySelector('#other')
    var rowFeatured = makeNewRow()
    var rowOther = makeNewRow()

    data.forEach(function(item, i) {

      var col = document.createElement('div')
      col.classList.add('col-sm-4')

      var thumbnail = document.createElement('div')
      thumbnail.classList.add('thumbnail')
      thumbnail.setAttribute('data-id', item.id)
      thumbnail.style.backgroundImage = 'url(' + item.image + ')'


      var caption = document.createElement('div')
      caption.classList.add('caption')

      var captionTitle = document.createElement('h4')
      captionTitle.innerHTML = item.title

      caption.appendChild(captionTitle)
      thumbnail.appendChild(caption)

      col.appendChild(thumbnail)

      if (item.featured === true) {
        rowFeatured.appendChild(col)
        feature.appendChild(rowFeatured)
      }
      else {
        rowOther.appendChild(col)
        other.appendChild(rowOther)
      }
    })
  })

  function makeNewRow (){
    var row = document.createElement('div')
    row.classList.add('row')
    return row
  }

  //Details Page
  if (window.location.href.includes('/detail.html?id=')) {
    fetch('https://sleepy-beach-29542.herokuapp.com/api/v1/portfolio')
      .then(function(jsonData){
        return jsonData.json()
      })
      .then(function(data) {
        //gets the id from the href
        var itemNumber = Number(window.location.search.slice(4))
        data.forEach(function(item) {
        if (item.id == itemNumber) {
          var detailImage = document.querySelector('.detailImage')
          var detailTitle = document.querySelector('.detailTitle')
          var description = document.querySelector('.detailDescription')
          var gitLink = document.querySelector('.gitLink')

          var img = document.createElement('img')
          img.setAttribute('src', item.image)
          img.classList.add('img-responsive')

          gitLink.setAttribute('href', item.repo)

          detailTitle.innerHTML = item.title
          description.innerHTML = item.description

          detailImage.appendChild(img)
        }
    })
  })
}
