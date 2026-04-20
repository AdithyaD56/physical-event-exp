"use client";

import { motion } from "framer-motion";
import { Coffee, Activity, DoorOpen, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const getIcon = (type: string) => {
  switch (type) {
    case 'food': return <Coffee className="h-5 w-5 text-orange-500" />;
    case 'restroom': return <Activity className="h-5 w-5 text-blue-500" />;
    case 'gate': return <DoorOpen className="h-5 w-5 text-green-500" />;
    case 'parking': return <Car className="h-5 w-5 text-cyan-400" />;
    default: return <Activity className="h-5 w-5 text-primary" />;
  }
};

const getStatusColor = (waitTime: number) => {
  if (waitTime < 10) return 'bg-green-500';
  if (waitTime < 25) return 'bg-yellow-500';
  return 'bg-red-500';
};

export function QueuePredictor({ queues = [] }: { queues?: any[] }) {
  return (
    <Card className="w-full glass-panel border border-white/5 shadow-2xl">
      <CardHeader className="py-4 border-b border-white/10">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary neon-glow" />
          <span className="neon-glow">Live Queue Times</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {queues.map((queue, idx) => (
            <motion.div 
              key={queue.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getIcon(queue.type)}
                  <div>
                    <p className="font-medium text-sm">{queue.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{queue.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{queue.waitTime} <span className="text-xs font-normal text-muted-foreground">min</span></p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Progress 
                  value={(queue.waitTime / 60) * 100} 
                  className="h-2"
                  indicatorClassName={getStatusColor(queue.waitTime)}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Predicted (+15m): {queue.predicted} min</span>
                <span className={queue.trend === 'up' ? 'text-red-400' : queue.trend === 'down' ? 'text-green-400' : 'text-blue-400'}>
                  {queue.trend === 'up' ? '↗ Expected to rise' : queue.trend === 'down' ? '↘ Expected to drop' : '→ Stable'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
