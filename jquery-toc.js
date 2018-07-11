(function ( $ ) {
  $.fn.toc = function(options) {
    var defaults = {
      status: false,
      selectors: 'h1, h2, h3',
      container: $('body'),
      placeholder: 'Empty',
      onOpen: function() {},
      onClose: function() {}
    };
   
    var settings = $.extend( {}, defaults, options );

    var $btn = this,
        $container = settings.container,
        selectors = settings.selectors;

    if (settings.status) {
      openToc();
    }

    $btn.on('click', function() {
      if (settings.status) {
        closeToc();
      } else {
        openToc();
      }
    });

    function openToc() {
      var tocItems = [],
          j = 1,
          list = '<ul>';

      $container
        .find(selectors)
        .each(function(i, item) {
          var index = item.id || 'toc-' + j++,
              text = item.textContent.trim(),
              className = 'toc-' + item.tagName.toLowerCase();

          if (item.id != index) {
            $(item).data('toc-id', true);
            item.id = index;
          }

          tocItems.push({
            index: index,
            text: text,
            className: className
          });
        });

      if (tocItems.length) {
        $.each(tocItems, function(i, item) {
          list += '<li class="' + item.className + '"><a href="#' + item.index + '">' + item.text + '</a></li>';
        });
      } else {
        list += '<li class="toc-empty">' + settings.placeholder + '</li>';
      }

      list += '</ul>';

      settings.status = true;
      settings.onOpen.call($btn, list);
    }

    function closeToc() {
      $container
        .find(settings.selectors)
        .each(function(i, item) {
          if ($(item).data('toc-id')) {
            $(item)
              .removeAttr('id')
              .removeData('toc-id');
          }
        });

      settings.status = false;
      settings.onClose.call($btn);
    }
  };
 
}( jQuery ));
