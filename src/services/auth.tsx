type signInProps = {
    username: string,
    password: string
}

export async function signIn({ username, password }: signInProps) {
    console.log(username);
}