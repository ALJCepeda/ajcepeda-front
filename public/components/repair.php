<?php $ipadURL = 'assets/images/portfolio/ipad'; ?>

<style type='text/css'>
	.portfolio-outer {
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
    }

	.portfolio-container {
		height: 100%;
		width:75%;
		text-align: center;
	}
</style>

<div class='portfolio-outer'>
	<div class='portfolio-container'>
		<div class='header'>
			<h1>Device Repair</h1>
		</div>

		<div class='body'>
			<p> Along with Software Engineering I'm able to perform minor hardware repairs on computers, game console and some small smart devices. The following pictures are of a recent repair on an iPad Mini. Apple would have charged me $200 to do this repair, but I was able to get it done for $50. </p>

			<img src='<?=$ipadURL?>/broken.jpg' width='75%' height='auto' />

			<p> The iPad's digitizer is removed exposing the underlying LCD screen. You can visibly see the damage to the LCD even with the power turned off. I didn't have all the right tools at the time and had to pry off the digitizer in order to separate it from the adhesive. Since then I've purchased a heat gun to avoid going through the hassle.</p>

			<img src='<?=$ipadURL?>/opened.jpg' width='75%' height='auto' />

			<p> Here is what lies underneath the LCD screen. As you can see the battery takes up most of the room in the device, which is typical for smart devices. Take a look at how big your cellphone battery is to get an idea. In this picture I've also completely removed the digitizer and LCD screen in preparation for their replacements.</p>

			<img src='<?=$ipadURL?>/repaired.jpg' width='75%' height='auto' />

			<p> Finally we have the repaired product, looking clean, slick and plugged in waiting to be tested. The original digitizer is still intact, functional and can be used to as a spare part in the future. </p>

			<img src='<?=$ipadURL?>/finished.jpg' width='75%' height='auto' />

			<p> Hurray! Working and ready for the best game available on the iOS marketplace, Faster Than Light: FTL. Get it now and fulfill your childhood dreams of being a two dimensional space captain, you'll thank me later :D</p>
		</div>
	</div>
</div>