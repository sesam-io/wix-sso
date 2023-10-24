# universal-login-page

### Development
In order to edit the Universal Login Page (ULP)
1. Open terminal (recommended the built-in `VSCode`)
2. run the  following commands

    ```hash
    // select VSCode as the default editor
    export EDITOR="code --wait"

    // open the ULP template
    auth0 universal-login templates update
    ```

3. Update the code and when finish create Github release
4. Update Github release version in the `script` src URL as follow:

    ```html
    <!-- in the header -->
    <script>
        const formType = '{{prompt.name}}';
        const siteId = '{{transaction.params.ext-site_id}}' || 'sesam';
    </script>

    <!-- in the body -->
    <script src="https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.5-ulp/artifact/ulp.js"></script>
```

5. After finishing to edit, close the file and select `Y` in the terminal to save and update the changes in the ULP