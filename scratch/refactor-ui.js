const fs = require('fs');
const path = require('path');

const files = [
  'app/layout.tsx',
  'components/layout/Navbar.tsx',
  'components/layout/Footer.tsx',
  'components/landing/Hero.tsx',
  'components/landing/FeatureSection.tsx',
  'components/landing/HowItWorks.tsx',
  'components/landing/TrustIndicators.tsx',
  'components/landing/SmartDecision.tsx',
  'components/landing/ProblemSection.tsx',
  'components/landing/BenefitSection.tsx',
  'components/landing/ProductShowcase.tsx',
  'components/landing/FaqSection.tsx',
  'components/landing/CtaSection.tsx',
  'components/theme-toggle.tsx',
  'components/ui/button.tsx',
  'components/ui/accordion.tsx'
].map(f => path.join('c:/healtech-2026', f));

// Helper function for regex replacements
const rep = (content, regex, to) => content.replace(regex, to);

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Backgrounds
    content = rep(content, /bg-slate-50 dark:bg-slate-950/g, 'bg-background');
    content = rep(content, /bg-white dark:bg-slate-900/g, 'bg-surface');
    content = rep(content, /bg-white dark:bg-slate-950/g, 'bg-background');
    content = rep(content, /bg-white dark:bg-slate-800/g, 'bg-surface');
    content = rep(content, /bg-slate-50 dark:bg-slate-900\/50/g, 'bg-surface-secondary/50');
    content = rep(content, /bg-slate-50 dark:bg-slate-950\/50/g, 'bg-surface-secondary/50');
    content = rep(content, /bg-white dark:bg-slate-950\/50/g, 'bg-surface/50');
    content = rep(content, /bg-slate-50 dark:bg-slate-800/g, 'bg-surface-secondary');
    content = rep(content, /bg-slate-50 dark:bg-slate-900/g, 'bg-surface-secondary');
    content = rep(content, /bg-slate-100 dark:bg-slate-800/g, 'bg-muted');
    content = rep(content, /bg-slate-900 dark:bg-slate-950/g, 'bg-background');
    content = rep(content, /bg-white\/80 dark:bg-slate-900\/80/g, 'bg-surface/80');
    content = rep(content, /bg-white\/90 dark:bg-slate-900\/90/g, 'bg-surface/90');
    content = rep(content, /bg-white/g, 'bg-surface');
    content = rep(content, /bg-slate-50/g, 'bg-background');
    content = rep(content, /bg-slate-950/g, 'bg-background'); // often used for dark fallback
    
    // Text colors
    content = rep(content, /text-slate-900 dark:text-white/g, 'text-foreground');
    content = rep(content, /text-slate-900 dark:text-slate-100/g, 'text-foreground');
    content = rep(content, /text-slate-800 dark:text-slate-200/g, 'text-foreground');
    content = rep(content, /text-slate-700 dark:text-slate-300/g, 'text-muted-foreground');
    content = rep(content, /text-slate-600 dark:text-slate-400/g, 'text-muted-foreground');
    content = rep(content, /text-slate-500 dark:text-slate-400/g, 'text-muted-foreground');
    content = rep(content, /text-slate-400 dark:text-slate-500/g, 'text-muted-foreground');
    
    content = rep(content, /text-slate-900/g, 'text-foreground');
    content = rep(content, /text-slate-800/g, 'text-foreground');
    content = rep(content, /text-slate-600/g, 'text-muted-foreground');
    content = rep(content, /text-slate-500/g, 'text-muted-foreground');
    
    content = rep(content, /text-blue-600 dark:text-blue-400/g, 'text-primary');
    content = rep(content, /text-blue-700 dark:text-blue-400/g, 'text-primary');
    content = rep(content, /text-blue-500 dark:text-blue-400/g, 'text-primary');
    content = rep(content, /text-blue-600/g, 'text-primary');

    // Borders
    content = rep(content, /border-slate-200 dark:border-slate-800/g, 'border-border');
    content = rep(content, /border-slate-200 dark:border-slate-700/g, 'border-border');
    content = rep(content, /border-slate-100 dark:border-slate-800/g, 'border-border-subtle');
    
    content = rep(content, /border-slate-200/g, 'border-border');
    content = rep(content, /border-slate-100/g, 'border-border-subtle');
    content = rep(content, /border-slate-800/g, 'border-border');
    
    // Any remaining `dark:bg-slate-900`
    content = rep(content, /dark:bg-slate-900/g, '');
    content = rep(content, /dark:bg-slate-950/g, '');
    content = rep(content, /dark:text-white/g, '');
    content = rep(content, /dark:text-slate-400/g, '');
    content = rep(content, /dark:border-slate-800/g, '');
    content = rep(content, /dark:border-slate-700/g, '');

    // Cleanup multiple spaces inside classes but NOT newlines
    content = content.replace(/className="([^"]+)"/g, (match, p1) => {
      return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
    });

    fs.writeFileSync(file, content);
    console.log(`Updated ${path.basename(file)}`);
  }
}
