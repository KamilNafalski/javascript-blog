'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');
  console.log(activeArticles);
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearTitleList() {
    titleList.innerHTML = '';
  }
  clearTitleList();

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    let html = '';
    /* get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* create HTML of the link */

    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
  }

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = ' ';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
  
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag +'">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + ' ' + tagHTML;
    
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}
  
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const allTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let allTagsLink of allTagsLinks) {
    /* remove class active */
    allTagsLink.classList.remove('active');
  
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLinksHref=  document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLinkHref of tagsLinksHref ){
    /* add class active */
    tagLinkHref.classList.add("active");
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const linksTags = document.querySelectorAll('.post-tags .list-horizontal a, .tags a');
  /* START LOOP: for each link */
  for(let linkTag of linksTags){
    /* add tagClickHandler as event listener for that link */
    linkTag.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const authors = article.querySelector(optArticleAuthorSelector);
    
    const articleAuthors = article.getAttribute('data-author');

    const linkAuthor = '<p>by <a href="#author-' + articleAuthors + '"><span>' + articleAuthors + '</span></a></p>';

    authors.innerHTML = linkAuthor;

  }
}
generateAuthors();

function authorClickHandler(event){

  event.preventDefault();
 
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const allAuthorsLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for (let allAuthorLink of allAuthorsLinks) {

    allAuthorLink.classList.remove('active');
  
  }

  const authorsLinksHref=  document.querySelectorAll('a[href="' + href + '"]');
 
  for(let authorLinkHref of authorsLinksHref){

    authorLinkHref.classList.add("active");
  }
 
  generateTitleLinks('[data-author~="' + author + '"]');
}

function addClickListenersToAuthors(){
  const linksAuthors = document.querySelectorAll(optArticleAuthorSelector);
  for(let linkAuthor of linksAuthors){
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();