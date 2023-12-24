
<script>
    import './Nav.css';
    import logo from '$lib/images/psi.png';
</script>

<nav class="background">
    <div class="logo">
        <img src={logo} alt="">
        <h1>
            YouTube Ψ <small>by Ramy Hadid ⌛</small>
        </h1>
    </div>
</nav>

<style>

    :root {
        --space: 15px;
    }

    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 var(--space);
        background-color: #fff;
        border-bottom: .5px solid red;

        margin-bottom: calc(var(--space) * 1.5);

        box-shadow: 0px 10px 15px -3px rgba(255, 0, 0, 0.1);
    }

    h1 small {
        font-size: 12px;
        font-weight: 400;
        color: gray;
    }

    .logo img {
        width: 50px;
        height: 50px;

        border-radius: 50%;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: var(--space);
    }
</style>
