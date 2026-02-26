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
  toast,
} from "poyraz-ui/molecules";
import { Icon } from "@iconify/react";
import { Dictionary } from "@/types/dictionary";
import { createContactMessage } from "@/lib/supabase/queries/contact";
import { ContactMessageTopic } from "@/types/admin";

interface ContactFormProps {
  dictionary: Dictionary;
}

export function ContactForm({ dictionary }: ContactFormProps) {
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<ContactMessageTopic | "">("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { info, form, alerts } = dictionary.contact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !topic || !message) {
      toast.error(alerts.fillRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      await createContactMessage({
        name,
        email,
        topic: topic as ContactMessageTopic,
        date: date ? date.toISOString() : undefined,
        time: time || undefined,
        message,
      });

      toast.success(alerts.success);
      // Reset form
      setName("");
      setEmail("");
      setTopic("");
      setDate(undefined);
      setTime("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error(alerts.error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <p className="text-slate-600">poyrazavsever@gmail.com</p>
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
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{form.title}</CardTitle>
            <CardDescription>{form.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{form.labels.name}</Label>
                <Input
                  id="name"
                  placeholder={form.placeholders.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{form.labels.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={form.placeholders.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">{form.labels.topic}</Label>
              <Select
                value={topic}
                onValueChange={(v) => setTopic(v as ContactMessageTopic)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder={form.placeholders.topic} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">{form.topics.project}</SelectItem>
                  <SelectItem value="consulting">
                    {form.topics.consulting}
                  </SelectItem>
                  <SelectItem value="speaking">
                    {form.topics.speaking}
                  </SelectItem>
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
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">{form.labels.time}</Label>
                <Select
                  value={time}
                  onValueChange={setTime}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={form.placeholders.time} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18:00">18:00 - 19:00</SelectItem>
                    <SelectItem value="19:00">19:00 - 20:00</SelectItem>
                    <SelectItem value="20:00">20:00 - 21:00</SelectItem>
                    <SelectItem value="21:00">21:00 - 22:00</SelectItem>
                    <SelectItem value="22:00">22:00 - 23:00</SelectItem>
                    <SelectItem value="23:00">23:00 - 24:00</SelectItem>
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end pt-4 border-t border-dashed border-slate-200">
            <Button
              size="lg"
              className="w-full md:w-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : form.buttonText}{" "}
              <Icon icon="mdi:send-variant-outline" className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
