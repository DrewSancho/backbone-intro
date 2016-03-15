(function ($) {
    // Create a new Collection of images
    var places = ['src/img/angeloak.jpg', 'src/img/desert.jpg', 'src/img/field.jpg', 'src/img/jungle.jpg', 'src/img/island.JPG'];
    var animals = ['src/img/llama.jpg', 'src/img/ibis.jpg', 'src/img/cheetah.jpg', 'src/img/snail.jpg', 'src/img/tiger.jpg'];
    var things = places.concat(animals);
    things = things.map(function (url) {
        return {
            url: url,
            likes: 0
        };
    });
    var images = new Backbone.Collection(things);

    $('submit').on('click', function () {
        var value = $('input').val();
        things.add({url: value,
            likes: 0
        });
    });

    // renders the collection of images into a div
    function createImageView (collection) {
        var el = $('<div>', {
            class: 'images'
        });
        function render () {
            el.empty();
            collection.forEach(function (model) {
                var imageView = imageViewer(model);
                el.append(imageView);
            });
        }
        collection.on('add', render);
        render();
        collection.on('remove', render);
        return el;
    }
    // function for individual images
    function imageViewer (model) {
        var el = $('<div>');
        function render () {
            el.empty();
            var likes = $('<button>', {
                class: 'likes'
            });
            var remove = $('<button>', {
                class: 'remove'
            });
            var image = $('<img>');

            image.attr('src', model.get('url'));
            remove.text('Remove');
            likes.text(model.get('likes'));
            likes.on('click', function () {
                model.set('likes', model.get('likes') + 1);
            });
            remove.on('click', function () {
                model.destroy();
            });
            el.append(image, likes, remove);
        }

        model.on('change', function () {
            render();
        });

        render();
        return el;
    }

    $(document.body).append(createImageView(images));
})(window.jQuery);