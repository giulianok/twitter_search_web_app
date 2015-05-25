app.
factory('SearchService', ['socketFactory', function(socketFactory) {
        //var myIoSocket = io.connect('http://localhost:3000');
        var myIoSocket = io.connect('http://nodejs-igrica.rhcloud.com:8000', {'forceNew':true });

        mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket;
}]);
