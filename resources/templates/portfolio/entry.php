<?php
	$imageURL = 'assets/images/portfolio';
	$selectedURL = "$imageURL/".$model->image();
?>

<div class='row-w m-between'>
	<div class='header'>
		<h3><?= $model->title ?></h3>
	</div>

	<div class='left col-nw m-between'>
		<div class='row-nw m-around c-center'>
	<?php 	foreach ($model->images as $name => $image) { 	?>
				<button class='f-aside button transparent' type='submit' name='image' value='<?= $name ?>'>
					<font class='<?= $model->selImage === $name ? 'active' : '' ?>'>
						<?= $name ?>
					</font>
				</button>
	<?php 	}	?>
		</div>
	</div>

	<div class='right col-nw m-start c-center y-scroll'>
		<?php foreach ($model->questions as $index => $entry) { ?>
			<button class='blue button' style='width:100%' type='submit' name='question' value='<?= $index ?>'>
				<?= $entry['Q'] ?>
			</button>

			<?php if($model->selQuestion === $index) { ?>
				<div>
					<p>
						<?= $entry['A'] ?>
					</p>
				</div>
			<?php } ?>
		<?php } ?>
	</div>
</div>
