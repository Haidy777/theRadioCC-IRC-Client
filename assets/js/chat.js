var chat = {
    registerConnectHandler: function () {
        $('#chat-connect').on('click', function () {
            chat.connect();
        });
    },

    connect: function () {
        var nickname = $('#nickname-input').val();

        if (_.isEmpty(nickname)) {
            alert('Du hast vergessen einen Nutzernamen einzugeben!');
        } else {

        }
    }
};