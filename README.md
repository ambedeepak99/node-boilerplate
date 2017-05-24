---------------------------------------------------------------------------------
To node in development mode use
---------------------------------------------------------------------------------
1.  Creating an environment variable named NODE_ENV, and setting it to 'production'.
2.  export NODE_ENV=development

OR
3.  run the node app with following command
    ```
    NODE_ENV=development node app.js
    ```

OR
4.  add to environment variable
    >* login as super user
        ```
        sudo -i
        gedit /etc/bash.bashrc
        ```
    >* write at the end of file
        ```
        NODE_ENV=development
        ```
    >* save file and close it