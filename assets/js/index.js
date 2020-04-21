function fileClosure(){ 
  // everything in this file should be declared within this closure (function).
  
  (function updateDate() {
    var date = new Date();
    var year = date.getFullYear();
    elem('.year').innerHTML = year;
  })();
  
  (function() {
    
  })();
  
  (function makeExternalLinks(){
    let links = elems('a');
    if(links) {
      Array.from(links).forEach(function(link){
        let target, rel, blank, noopener, attr1, attr2, url, isExternal;
        url = elemAttribute(link, 'href');
        isExternal = (url && typeof url == 'string' && url.startsWith('http')) && !url.startsWith(parentURL) ? true : false;
        if(isExternal) {
          target = 'target';
          rel = 'rel';
          blank = '_blank';
          noopener = 'noopener';
          attr1 = elemAttribute(link, target);
          attr2 = elemAttribute(link, noopener);
          
          attr1 ? false : elemAttribute(link, target, blank);
          attr2 ? false : elemAttribute(link, rel, noopener);
        }
      });
    }
  })();
  
  let headingNodes = [], results, link, icon, current, id,
  tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  
  current = document.URL;
  
  tags.forEach(function(tag){
    results = document.getElementsByTagName(tag);
    Array.prototype.push.apply(headingNodes, results);
  });
  
  headingNodes.forEach(function(node){
    link = createEl('a');
    loadSvg('link', link);
    link.className = 'link icon';
    id = node.getAttribute('id');
    if(id) {
      link.href = `${current}#${id}`;
      node.appendChild(link);
      pushClass(node, 'link_owner');
    }
  });
  
  let inlineListItems = elems('ol li');
  if(inlineListItems) {
    inlineListItems.forEach(function(listItem){
      let firstChild = listItem.children[0]
      let containsHeading = isMatch(firstChild, tags);
      containsHeading ? pushClass(listItem, 'align') : false;
    })
  }
  
  (function copyCode(){
    const markedCodeBlocks = elems('code');
    const copyClass = 'hljs-copy';
    const copyLabel = 'copy';
    const copyFeedbackLabel = 'copied';
    const blocks = Array.from(markedCodeBlocks).filter(function(block){
      return hasClasses(block) && !Array.from(block.classList).includes('noClass');
    }).map(function(block){
      return block
    });
    
    blocks.forEach(function(block){
      // add copy button
      const button = createEl()
      button.className = copyClass;
      button.textContent = copyLabel;
      const highlightElement = block.parentNode.parentNode;
      const highlightWrapper = createEl();
      highlightWrapper.className = 'highlight_wrap';
      wrapEl(highlightElement, highlightWrapper);
      highlightWrapper.appendChild(button);
    });
    
    doc.addEventListener('click', function(event){
      // copy code block
      const target = event.target;
      const isCopyIcon = target.matches(`.${copyClass}`);
      if(isCopyIcon) {
        const codeElement = target.previousElementSibling.firstElementChild.firstElementChild;
        // clone code element
        const codeElementClone = codeElement.cloneNode(true);
        const lineNumbers = elems('.ln', codeElementClone);
        // remove line numbers before copying
        if(lineNumbers) {
          lineNumbers.forEach(function(line){
            line.remove();
          });
        }
        const codeToCopy = codeElementClone.textContent;

        copyToClipboard(codeToCopy);
        target.textContent = copyFeedbackLabel;
      }
    })
  })();  
  
  function copyFeedback(parent) {
    const copyText = document.createElement('div');
    const yanked = 'link_yanked';
    copyText.classList.add(yanked);
    copyText.innerText = 'Link Copied';
    if(!elem(`.${yanked}`, parent)) {
      parent.appendChild(copyText);
      setTimeout(function() { 
        parent.removeChild(copyText)
      }, 3000);
    }
  }
  
  (function copyHeadingLink() {
    let deeplink, deeplinks, newLink, parent, target;
    deeplink = 'link';
    deeplinks = elems(`.${deeplink}`);
    if(deeplinks) {
      document.addEventListener('click', function(event)
      {
        target = event.target;
        parent = target.parentNode;
        if (target && containsClass(target, deeplink) || containsClass(parent, deeplink)) {
          event.preventDefault();
          newLink = target.href != undefined ? target.href : target.parentNode.href;
          copyToClipboard(newLink);
          target.href != undefined ?  copyFeedback(target) : copyFeedback(target.parentNode);
        }
      });
    }
  })();
  
  (function copyLinkToShare() {
    let  copy, copied, excerpt, isCopyIcon, isInExcerpt, link, postCopy, postLink, target;
    copy = 'copy';
    copied = 'copy_done';
    excerpt = 'excerpt';
    postCopy = 'post_copy';
    postLink = 'post_card';
    
    doc.addEventListener('click', function(event) {
      target = event.target;
      isCopyIcon = containsClass(target, copy);
      let isWithinCopyIcon = target.closest(`.${copy}`);
      if (isCopyIcon || isWithinCopyIcon) {
        let icon = isCopyIcon ? isCopyIcon : isWithinCopyIcon;
        isInExcerpt =  containsClass(icon, postCopy);
        if (isInExcerpt) {
          link = target.closest(`.${excerpt}`).previousElementSibling;
          link = containsClass(link, postLink)? elemAttribute(link, 'href') : false;
        } else {
          link = window.location.href;
        }
        if(link) {
          copyToClipboard(link);
          pushClass(icon, copied);
        }
      }
      const yankLink = '.link_yank';
      const isCopyLink = target.matches(yankLink);
      const isCopyLinkIcon = target.closest(yankLink);
      
      if(isCopyLink || isCopyLinkIcon) {
        event.preventDefault();
        const yankContent = isCopyLinkIcon ? elemAttribute(target.closest(yankLink), 'href') : elemAttribute(target, 'href');
        copyToClipboard(yankContent);
        isCopyLink ?  copyFeedback(target) : copyFeedback(target.parentNode);
      }
      
    });
  })();
  
  (function hideAside(){
    let aside, title, posts;
    aside = elem('.aside');
    title = aside ? aside.previousElementSibling : null;
    if(aside && title.nodeName.toLowerCase() === 'h3') {
      posts = Array.from(aside.children);
      posts.length < 1 ? title.remove() : false;
    }
  })();
  
  (function goBack() {
    let backBtn = elem('.btn_back');
    let history = window.history;
    if (backBtn) {
      backBtn.addEventListener('click', function(){
        history.back();
      });
    }
  })();
  
  function populateAlt(images) {
    images.forEach((image) => {
      const inline = ":inline";
      let alt = image.alt;
      
      const modifiers = [':left', ':right'];
      
      modifiers.forEach(function(modifier){
        const canModify = alt.includes(modifier);
        if(canModify) {
          pushClass(image, `float_${modifier.replace(":", "")}`);
          
          alt = alt.replace(modifier, "");
        }
      });
      
      const isInline = alt.includes(inline);
      alt = alt.replace(inline, "");
      if (alt.length > 0 && !containsClass(image, 'alt')) {
        image.addEventListener('load', function() {
          let desc = document.createElement('p');
          const imageWidth = image.clientWidth;
          desc.style.width = `${imageWidth}px`;
          // desc.dataset.width = `${imageWidth}px`;
          desc.classList.add('img_alt');
          desc.textContent = image.alt;
          image.insertAdjacentHTML('afterend', desc.outerHTML);
        })
      }
      
      if(isInline) {
        modifyClass(image, 'inline');
      }
      
    });
    
    hljs.initHighlightingOnLoad();
  }
  
  function largeImages(baseParent, images = []) {
    if(images) {
      images.forEach(function(image) {
        let actualWidth = image.naturalWidth;
        
        let parentWidth = baseParent.offsetWidth;
        
        let actionableRatio = actualWidth / parentWidth;
        
        if (!(actionableRatio <= 1)) {
          pushClass(image, "image-scalable");
          image.dataset.scale = actionableRatio;
          
          let figure = createEl('figure');
          
          wrapEl(image, figure)
        }
        
      })
    }
  }
  
  (function AltImage() {
    let post = elem('.content');
    let images = post ? post.querySelectorAll('img') : false;
    images ? populateAlt(images) : false;
    largeImages(post, images);
  })();
  
  
  doc.addEventListener('click', function(event) {
    let target = event.target;
    isClickableImage = target.matches('.image-scalable');
    
    let isFigure = target.matches('figure');
    
    if(isFigure) {
      let hasClickableImage = containsClass(target.children[0], 'image-scalable');
      if(hasClickableImage) {
        modifyClass(target, 'image-scale');
      }
    }
    
    if(isClickableImage) {
      let figure = target.parentNode;
      modifyClass(figure, 'image-scale');
    }
    
    const toTop = 'to_top';
    let isToTop = target.matches(`.${toTop}`)|| target.closest(`.${toTop}`);
    
    if (isToTop) {
      window.scrollTo(0,0);
    }
  });
  
  const tables = elems('table');
  if (tables) {
    const scrollable = 'scrollable';
    tables.forEach(function(table) {
      const wrapper = createEl();
      wrapper.className = scrollable;
      wrapEl(table, wrapper);
    });
  }
  
  (function navToggle() {
    doc.addEventListener('click', function(event){
      const target = event.target;
      const open = 'jsopen';
      if(target.matches('.nav_close')) {
        event.preventDefault();
        modifyClass(doc, open);
      }
      
      if(!target.closest('.nav') && elem(`.${open}`)) {
        modifyClass(doc, open);
      }
      
      const navItem = 'nav_item';
      const navSub = 'nav_sub';
      const showSub = 'nav_open';
      const isNavItem = target.matches(`.${navItem}`);
      const isNavItemIcon = target.closest(`.${navItem}`)
      
      if(isNavItem || isNavItemIcon) {
        const thisItem = isNavItem ? target : isNavItemIcon;
        const hasNext = thisItem.nextElementSibling
        const hasSubNav = hasNext ? hasNext.matches(`.${navSub}`) : null;
        if (hasSubNav) {
          event.preventDefault();
          modifyClass(thisItem, showSub);
        } 
      }
      
    });
  })();
  
  (function toggleColorModes(){
    const light = 'lit';
    const dark = 'dim';
    const storageKey = 'colorMode';
    const key = '--color-mode';
    const data = 'data-mode';
    const bank = window.localStorage;
    
    function currentMode() {
      let acceptableChars = light + dark;
      acceptableChars = [...acceptableChars];
      let mode = getComputedStyle(doc).getPropertyValue(key).replace(/\"/g, '').trim();
      
      mode = [...mode].filter(function(letter){
        return acceptableChars.includes(letter);
      });
      
      return mode.join('');
    }
    
    function changeMode(isDarkMode) {
      if(isDarkMode) {
        bank.setItem(storageKey, light)
        elemAttribute(doc, data, light);
      } else {
        bank.setItem(storageKey, dark);
        elemAttribute(doc, data, dark);
      }
    }
    
    function setUserColorMode(mode = false) {
      const isDarkMode = currentMode() == dark;
      const storedMode = bank.getItem(storageKey);
      if(storedMode) {
        if(mode) {
          changeMode(isDarkMode);
        } else {
          elemAttribute(doc, data, storedMode);
        }
      } else {
        if(mode === true) {
          changeMode(isDarkMode) 
        }
      }
    }
    
    setUserColorMode();
    
    doc.addEventListener('click', function(event) {
      let target = event.target;
      let modeClass = 'color_choice';
      let animateClass = 'color_animate';
      let isModeToggle = containsClass(target, modeClass);
      if(isModeToggle) {
        pushClass(target, animateClass);
        setUserColorMode(true);        
      }
    });
  })();

  // add new code above this line
}
window.addEventListener('load', fileClosure());