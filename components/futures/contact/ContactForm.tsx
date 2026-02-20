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
import { Dictionary } from "@/types/dictionary";

interface ContactFormProps {
  dictionary: Dictionary;
}

export function ContactForm({ dictionary }: ContactFormProps) {
  const [date, setDate] = useState<Date>();
  const { info, form } = dictionary.contact;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: Contact Info */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">{info.title}</h3>
          <p className="text-slate-600">{info.description}</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none border border-dashed border-slate-300 flex items-center justify-center text-red-600 bg-red-50">
              <Icon icon="mdi:email-outline" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">{info.emailLabel}</h4>
              <p className="text-slate-600">contact@poyrazavsever.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none border border-dashed border-slate-300 flex items-center justify-center text-red-600 bg-red-50">
              <Icon icon="mdi:map-marker-outline" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">{info.locationLabel}</h4>
              <p className="text-slate-600">{info.locationValue}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-none border border-dashed border-slate-300 flex items-center justify-center text-red-600 bg-red-50">
              <Icon icon="mdi:calendar-check-outline" className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">{info.availabilityLabel}</h4>
              <p className="text-slate-600">{info.availabilityValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <Card variant="bordered" className="w-full">
        <CardHeader>
          <CardTitle>{form.title}</CardTitle>
          <CardDescription>{form.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{form.labels.name}</Label>
              <Input id="name" placeholder={form.placeholders.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{form.labels.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={form.placeholders.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">{form.labels.topic}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={form.placeholders.topic} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project">{form.topics.project}</SelectItem>
                <SelectItem value="consulting">
                  {form.topics.consulting}
                </SelectItem>
                <SelectItem value="speaking">{form.topics.speaking}</SelectItem>
                <SelectItem value="other">{form.topics.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 flex flex-col">
              <Label className="mb-2">{form.labels.date}</Label>
              <DatePicker
                selected={date}
                onSelect={setDate}
                placeholder={form.placeholders.date}
                minDate={new Date()}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">{form.labels.time}</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={form.placeholders.time} />
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
            <Label htmlFor="message">{form.labels.message}</Label>
            <Textarea
              id="message"
              placeholder={form.placeholders.message}
              rows={4}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-4 border-t border-dashed border-slate-200">
          <Button size="lg" className="w-full md:w-auto">
            {form.buttonText}{" "}
            <Icon icon="mdi:send-variant-outline" className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
