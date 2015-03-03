$.fn.modalcarousel = function(config){
    var defaults={
        thumb_image_width: 150,
        thumb_urls: {},
        close_box_selector: '.light_window_close',
        left_move_selector: '.prev',
        right_move_selector: '.next',
        callback: function () {},
        close_click_bg: false,
        box_html: '<div class="light_window"><div class="light_window_close"><i class="fa fa-times"></i></div><div class="mainvis"></div><div class="carousel"><div class="viewport"><ul class="contents"></ul></div><div class="menu"><a class="button prev" href="#"><i class="fa fa-chevron-left"></i></a><a class="button next" href="#"><i class="fa fa-chevron-right"></a></div></div></div>'
    };
    
    var options=$.extend(defaults, config);
    
    return this.each(function(){
        
        $(this).on('click', function () {
            showBox();
        });
        
        // 背景
        var $bg = $('<div class="light_window_bg"></div>');

        // モーダル
        var $box = $(options.box_html);
        
        // メインビジュアル
        var $mainvis = $box.find('.mainvis');
        
        // カルーセル
        var $carousel = $box.find('.carousel');
        
        // サムネイル表示エリア
        var $thumbs  = $box.find('.carousel .contents');
        
        // サムネイル左へ移動ボタン
        var $left_button = $box.find(options.left_move_selector);
        
        // サムネイル右へ移動ボタン
        var $right_button = $box.find(options.right_move_selector);
        
        // サムネイル一個の幅
        var thumb_width = 0;
        
        // 画像が展開されている幅
        var total_thumb_width = 0;
        
        // 表示されている幅
        var display_thumb_width = 0;
        
        var showBox = function () {
            
            options.callback.call(this, $box);
            
            // モーダルボックスのセットアップ
            setupBox();
            
            $(window).on('resize', function () {
                fitBox();
            });
        };
        
        // 各種幅の取得
        var setParameter = function () {
            
            thumb_width = options.thumb_image_width;
            thumb_width += parseInt($thumbs.find('li').css('margin-left').replace('px', ''));
            thumb_width += parseInt($thumbs.find('li').css('margin-right').replace('px', ''));
            
            total_thumb_width = options.thumb_urls.length * thumb_width;
            
            $box.find('.viewport').width($mainvis.width());
            
            display_thumb_width = $mainvis.width();
        };
        
        // メインビジュアルをセット
        var setMainVisual = function (url, title) {
            
            var $img = $('<img>', {
                'src': url
            });
            $img.hide();
            $mainvis.html($img);
            
            $img.on('load', function () {
                
                $(this).fadeIn();
                
                $mainvis.append('<p class="light_window_title">' + title + '</p>');
                fitBox();
            });
        };
        
        // モーダルボックスのセットアップ
        var setupBox = function () {
            
            $('body').append($bg);
            
            $thumbs.html('');
            for (var i = 0; i < options.thumb_urls.length; i++) {
                var url = options.thumb_urls[i].url;
                var title = options.thumb_urls[i].title || '';
                (function (url, title) {
                    var $li = $('<li>');
                    var $img = $('<img>', {
                        'title': title,
                        'src': url,
                        'width': options.thumb_image_width
                    }).appendTo($li);
                    $img.on('click', function (e) {
                        setMainVisual(url, title);
                    });
                    $img.hide();
                    $thumbs.append($li);
                    $img.on('load', function () {
                        $(this).show();
                    });
                }) (url, title);
            }
            
            $('body').append($box);
            
            // 閉じるボタンのモーダルを閉じる処理
            $box.find(options.close_box_selector).bind('click', function (e) {
                   e.preventDefault();
                close();
            });
            
            // バックグラウンドをクリックするとモーダルを閉じる
            if (options.close_click_bg == true) {
                $bg.on('click', function (e) {
                    close();
                });
            }
            
            // サムネイルを左に移動
            $left_button.on('click', function () {
                move_left();
            });
            
            // サムネイルを右に移動
            $right_button.on('click', function () {
                move_right();
            });
            
            // サムネイルの一番左をメインビジュアル
            var $first_thumb = $thumbs.find('li').first().find('img');
            setMainVisual($first_thumb.attr('src'), $first_thumb.attr('title'));
            
            $box.fadeIn('slow', function () {
                
                setParameter();
                
                $thumbs.css({
                    'left': 0,
                    'width': total_thumb_width
                });
                
                slide_thumb_callback(get_thumbs_current_left());
            });
        };
        
        // モーダルボックスサイズの調整
        var fitBox = function () {
            var height = 0;
            height += $mainvis.height();
            height += parseInt($mainvis.css('margin-top').replace('px', ''));
            height += parseInt($mainvis.css('margin-bottom').replace('px', ''));
            height += parseInt($mainvis.css('padding-top').replace('px', ''));
            height += parseInt($mainvis.css('padding-bottom').replace('px', ''));
            
            height += $carousel.height();
            height += parseInt($carousel.css('margin-top').replace('px', ''));
            height += parseInt($carousel.css('margin-bottom').replace('px', ''));
            height += parseInt($carousel.css('padding-top').replace('px', ''));
            height += parseInt($carousel.css('padding-bottom').replace('px', ''));
            
            $box.height(height);
        };
        
        // モーダルを閉じる
        var close = function () {
            
            $left_button.off('click');
            $right_button.off('click');
            
            $bg.off('click');
            
            $thumbs.find('li img').each(function () {
                $(this).off('click');
            });
            
            $(window).off('resize');
            
            $box.hide();
            $bg.remove();
        };
        
        // サムネイルを右へ移動
        var move_right = function () {
            
            if ($thumbs.hasClass('active')) {
                return false;
            }
            var current_left = get_thumbs_current_left();
            
            if (is_max_right(current_left)) {
                return false;
            }
            
            var new_left = current_left + thumb_width;
            
            $thumbs.addClass('active');
            $thumbs.animate({left: new_left}, function () {
                $thumbs.removeClass('active');
                
                slide_thumb_callback(new_left);
            });
        };
        
        // サムネイルを左へ移動
        var move_left = function () {
            
            if ($thumbs.hasClass('active')) {
                return false;
            }
            var current_left = get_thumbs_current_left();
            
            if (is_max_left(current_left)) {
                return false;
            }
            
            var new_left = current_left - thumb_width;
            
            $thumbs.addClass('active');
            $thumbs.animate({left: new_left}, function () {
                $thumbs.removeClass('active');
                
                slide_thumb_callback(new_left);
            });
        };
        
        // 
        var get_thumbs_current_left = function () {
            
            var current_left = $thumbs.css('left') || 0;
            current_left = parseInt(current_left.replace('px', ''));
            
            return current_left;
        };
        
        // 
        var is_max_right = function (current_left) {
            
            if (current_left >= 0 || display_thumb_width > total_thumb_width) {
                return true;
            }
            return false;
        };
        
        // 
        var is_max_left = function (current_left) {
            
            if (total_thumb_width <= (display_thumb_width + Math.abs(current_left)) || display_thumb_width > total_thumb_width) {
                return true;
            }
            return false;
        };
        
        var slide_thumb_callback = function (current_left) {
            if (is_max_left(current_left)) {
                $left_button.hide();
            } else {
                $left_button.show();
            }
            
            if (is_max_right(current_left)) {
                $right_button.hide();
            } else {
                $right_button.show();
            }
        };
    });
};