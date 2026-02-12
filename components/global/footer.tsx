export default function Footer() {
  return (
    <footer className="border-t border-border/40 px-6 py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-sm text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} MotionDesk</span>
        <a
          href="mailto:support@fluidfield.app"
          className="hover:text-foreground transition-colors"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
