
import { CircleUser, Laugh, Menu, Search } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { ModeToggle } from "./mode-toggle";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";


export async function Header() {

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Laugh className="h-6 w-6" />
            <span className="sr-only">Doodle</span>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse
          </Link>
          <FavoritePageAccess />
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Laugh className="h-6 w-6" />
                <span className="sr-only">Doodle</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Browse
              </Link>
              <FavoritePageAccess />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form
            action={async (FormData) => {
                "use server";
                const search = FormData.get("search");
                redirect(`/search?q=${search}`);
            }}
          className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                name="search"
                type="search"
                placeholder="Search memes..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <ModeToggle />
          <AccountMenu />
        </div>
      </header>
    )
}


async function AccountMenu() {

  const session = await auth()

  if (!session) {
    return (
      <form
      action={async () => {
        "use server"
        await signIn()
      }}
      >
        <Button type="submit">Login</Button>
      </form>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full bg-transparent">
        <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <form
          action={async () => {
            "use server"
            await signOut()
          }}
          >
            <button type="submit">Logout</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

async function FavoritePageAccess() {
  const session = await auth()
  if (session) {
    return (
      <Link
      href="/favorites"
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      Favorites
    </Link>
    )
  }
}