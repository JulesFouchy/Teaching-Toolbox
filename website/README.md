

## Deploying

To setup CI:
 - Copy the *.github* folder to the root of your repo
 - Generate a ssh key: open *Git Bash* and run `ssh-keygen -t ed25519 -C "jules.fouchy@ntymail.com"` (check [this](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) for more info)
 - Rename the *.ssh* folder that has been generated in your *Users/[yourname]* folder to something more meaningful.
 - Copy the content of the public key to *Your_GitHub_Repo->Settings->Deploy keys* and don't forget to tick **Allow write access**
 - Copy the content of the private key to *Your_GitHub_Repo->Settings->Secrets* and name the secret **GH_PAGES_DEPLOY**