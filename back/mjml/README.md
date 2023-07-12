# [mjml](https://mjml.io)

What is MJML ? When writting email html templates, you may think that using standard html it will work like it works for applications ? 
Nope, it's not working like that. 

[This cool website](https://www.caniemail.com/search/?s=flex) shows you that there is a lot of attributes that are not being understood by many mail providers.

And cherry on the cake, as it was with Internet Explorer 6, we have Outlook that doesn't handle well some basic properties without hacky things like VML.

It's with that in mind that MJML came into play.

> MJML is responsive by design on most-popular email clients, even Outlook. Write less code, save time and code more efficiently with MJML’s semantic syntax.


## Development

### Update templates

In the `/mjml` folder, update your templates by using the special tags from their [documentation](https://documentation.mjml.io/#components).

You can install the `mjml` plugin with VSCode to have a live preview while editing your code.

### Generate the HTML file

```
yarn mjml2html
```

This command will transform the `.mjml` file into `.html` file. 
Please do it before **committing**.

And that's all.