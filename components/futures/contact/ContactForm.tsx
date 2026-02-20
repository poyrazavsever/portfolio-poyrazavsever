"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Textarea,
} from "poyraz-ui/atoms";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  DatePicker,
} from "poyraz-ui/molecules";
import { Icon } from "@iconify/react";

export function ContactForm() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: Contact Info */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Contact Information</h3>
          <p className="text-slate-600">
            Fill out the form to schedule a meeting or send a direct message. I
            usually respond within 24 hours.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none border border-dashed border-slate-300 flex items-center justify-center text-red-600 bg-red-50">
              <Icon icon="mdi:email-outline" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-slate-600">contact@poyrazavsever.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none border border-dashed border-slate-300 flex items-center justify-center text-red-600 bg-red-50">
              <Icon icon="mdi:map-marker-outline" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">Location</h4>
              <p className="text-slate-600">
                Istanbul, Turkey (Remote Available)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none border border-dashed border-slate-300 flex items-center justify-center text-red-600 bg-red-50">
              <Icon icon="mdi:calendar-check-outline" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">Availability</h4>
              <p className="text-slate-600">Mon - Fri, 09:00 - 18:00 (GMT+3)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <Card variant="bordered" className="w-full">
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>
            Schedule a meeting or ask a question.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project">Project Inquiry</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="speaking">Speaking Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 flex flex-col">
              <Label className="mb-2">Preferred Date</Label>
              <DatePicker
                selected={date}
                onSelect={setDate}
                placeholder="Pick a date"
                minDate={new Date()}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                  <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                  <SelectItem value="11:00">11:00 - 12:00</SelectItem>
                  <SelectItem value="13:00">13:00 - 14:00</SelectItem>
                  <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                  <SelectItem value="15:00">15:00 - 16:00</SelectItem>
                  <SelectItem value="16:00">16:00 - 17:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Tell me about your project or question..."
              rows={4}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-4 border-t border-dashed border-slate-200">
          <Button size="lg" className="w-full md:w-auto">
            Send Message{" "}
            <Icon icon="mdi:send-variant-outline" className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
