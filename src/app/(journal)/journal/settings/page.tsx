import Link from "next/link"

import { getUserByClerkId } from "@/lib/auth"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppearanceForm } from "@/components/appearance-form"
import { JournalHeader } from "@/components/header"
import { ReminderForm } from "@/components/reminder-form"
import { JournalShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function SettingsPage() {
  const user = await getUserByClerkId()
  // @ts-ignore
  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  return (
    <JournalShell>
      <JournalHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <Separator />
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="reminder">Reminder</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <UserNameForm user={{ id: user!.id, name: user!.name }} />
              <div>
                <p className="font-semibold">Profile</p>
                <div className="space-y-8">
                  <p className="text-muted-foreground">
                    Manage your profile information with clerk
                  </p>
                  <Link
                    href="/journal/settings/user-profile"
                    className={cn(buttonVariants())}
                  >
                    Manage Profile
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the appearance of the app. Automatically switch
                between day and night themes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              <AppearanceForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reminder">
          <Card>
            <CardHeader>
              <CardTitle>Reminder</CardTitle>
              <CardDescription>
                Customize the reminder frequency you are comfortable with.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10">
              {!subscriptionPlan.isPro && (
                <Alert className="max-w-xl">
                  <AlertTitle className="text-xl">Attention!</AlertTitle>
                  <AlertDescription className="space-y-5">
                    <p className="text-base">
                      You are currently on our free plan. Upgrade now to unlock
                      this and more premium features and enhance your
                      experience!
                    </p>

                    <Link
                      href="/journal/billing"
                      className={cn(buttonVariants())}
                    >
                      Go to Billing
                    </Link>
                  </AlertDescription>
                </Alert>
              )}
              <ReminderForm subscriptionPlan={subscriptionPlan} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </JournalShell>
  )
}
