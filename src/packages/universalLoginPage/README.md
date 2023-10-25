# universal-login-page

Branding the `auth0` universal login page.

Read more here: [Customize New Universal Login Pages](https://auth0.com/docs/customize/universal-login-pages/universal-login-page-templates)

![Alt text](<../../assets/ulp-example.png>)

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

![Alt text](<../../assets/ulp-template-example.png>)

> Note: Running `auth0 universal-login templates update` will also open a Storybook page in the browser. That's for designing the ULP. However, since we added a custom scripts code in the `body` of the template, the design in Storybook seems to be broken.

3. Update the code and when finish create Github release
4. Update Github release version in the `script` src URL as follow:

```html
<!-- should be permanently in the page header -->
<script>
    const formType = '{{prompt.name}}';
    const siteId = '{{transaction.params.ext-site_id}}' || 'sesam';
</script>

<!-- should be in the page body, under {%- auth0:widget -%} -->
<script src="https://cdn.jsdelivr.net/gh/sesam-io/wix-sso@v1.0.5-ulp/artifact/ulp.js"></script>
```

5. After finishing to edit, close the file and select `Y` in the terminal to save and update the changes in the ULP

![Alt text](<../../assets/ulp-template-terminal-example.png>)